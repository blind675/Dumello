import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Easing,
    Animated,
    Dimensions,
    Platform,
    PermissionsAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import TimerMixin from 'react-timer-mixin';
import { connect } from 'react-redux';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Sound from 'react-native-sound';

import { Button } from './common';
import TagCloud from './common/TagCloud/TagCloud';
import Tag from './common/TagCloud/Tag';
import { startSubmitEntry, submitEntry } from '../actions';

const reactMixin = require('react-mixin');

const colorsArray = ['#FF5454', '#FF8133', '#FFBE1A', '#02D174', '#00B5D9', '#9873E6'];
const { width, height } = Dimensions.get('window');
const size = Math.min(width, height);

class RecordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: new Animated.Value(0),
            bottom: new Animated.Value(0),
            backgroundViewColor: 'transparent',
            backgroundViewTemporaryColor: 'transparent',
            showCircle: true,
            selectedColor: colorsArray[0],
            duration: 0,
            displayRecordingDuration: '-00:59',
            recordingScreenVisible: true,
            submittingScreenVisible: false,
            selectedTagsViews: [],
            selectedTags: [],
            audioFileName: 'recording.aac',
            hasPermission: undefined,
            playing: false
        };
        this.counterInterval = null;
        this.animationInterval = null;
        this.sound = null;
    }

    componentWillMount() {
        // generate random recording file name
        const userName = this.props.profile.name.replace(/\s/g, '');
        const fileId = `${new Date().getTime()}${userName}.aac`;
        console.log(fileId);

        this.setState({
            audioFileName: fileId
        });

        // Enable playback in silence mode
        Sound.setCategory('Playback');
        
        this.checkPermission().then((hasPermission) => {
            this.setState({ hasPermission });

            if (!hasPermission) return;
            this.prepareRecordingPath(`${AudioUtils.DocumentDirectoryPath}/${this.state.audioFileName}`);

            this.record();
        });

        this.animateCircle();

        this.animationInterval = this.setInterval(() => {
            this.animateCircle();
        }, 6900);

        this.setTimeout(() => {
            this.counterInterval = this.setInterval(() => {
                this.state.duration++;
                const time = 60 - this.state.duration;
                const displayTime = time > 9 ? `${time}` : `0${time}`;
                this.setState({
                    displayRecordingDuration: `-00:${displayTime}`
                });
                if (this.state.duration === 60) {
                    this.stopRecording();
                }
            }, 1000);
        }, 200);
    }

    checkPermission() {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
            // return AudioRecorder.checkAuthorizationStatus().then((result) => {
            //     console.log('Permission result:', result);
            //     return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
            // });
        }

        const rationale = {
            title: 'Microphone Permission',
            message: 'AudioExample needs access to your microphone so you can record audio.'
        };

        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
            .then((result) => {
                console.log('Permission result:', result);
                return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
            });
    }

    prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: 'Low',
            AudioEncoding: 'aac',
            AudioEncodingBitRate: 32000,
            MeteringEnabled: true
        });
    }

    async playStop() {
        if (this.sound) {
            this.sound.stop(() => {
                this.sound.release();
                this.sound = null;
                this.setState({ playing: false });
            });
        } else {
            // These timeouts are a hacky workaround for some issues with react-native-sound.
            // See https://github.com/zmxv/react-native-sound/issues/89.
            setTimeout(() => {
                this.sound = new Sound(`${AudioUtils.DocumentDirectoryPath}/${this.state.audioFileName}`, '', (error) => {
                    if (error) {
                        console.log('failed to load the sound', error);
                    }
                });
                this.sound.setVolume(0.9);

                setTimeout(() => {
                    this.setState({ playing: true });
                    this.sound.play((success) => {
                        if (success) {
                            console.log('successfully finished playing');
                            this.sound.release();
                            this.sound = null;
                            this.setState({ playing: false });
                        } else {
                            console.log('playback failed due to audio decoding errors');
                            this.sound.release();
                            this.sound = null;
                            this.setState({ playing: false });
                        }
                    });
                }, 100);
            }, 100);
        }
    }

    async record() {
        try {
            await AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
    }

    async endRecording() {
        try {
            const filePath = await AudioRecorder.stopRecording();
            return filePath;
        } catch (error) {
            console.error(error);
        }
    }

    animateCircle() {
        const nextColor = colorsArray[Math.floor(Math.random() * colorsArray.length)];

        this.setState({
            showCircle: true,
            selectedColor: nextColor,
            backgroundViewTemporaryColor: 'transparent',
        });

        Animated.timing(this.state.scale, {
            toValue: 4,
            duration: 900,
            easing: Easing.linear
        }).start(() => {
            this.setState({
                backgroundViewColor: this.state.selectedColor,
                backgroundViewTemporaryColor: this.state.selectedColor,
                showCircle: false,
                scale: new Animated.Value(0),
            });
        });
    }

    submittingButtonPressed() {
        console.log('- submitting Button Pressed :');

        if (this.state.selectedTags.length === 0) {
            console.log('no tag selected');
            return;
        }

        this.props.startSubmitEntry();

        const tags = this.state.selectedTags.length > 3 ? this.state.selectedTags.slice(3) : this.state.selectedTags;
        const duration = this.state.duration;
        const entryColor = this.state.backgroundViewColor;

        this.props.submitEntry({
            filePath: `${AudioUtils.DocumentDirectoryPath}/${this.state.audioFileName}`,
            audioFileName: this.state.audioFileName,
            entryColor,
            duration,
            tags
        });
        this.closeScreen();
    }

    stopRecording() {
        this.setState({
            submittingScreenVisible: true,
        });
        this.clearInterval(this.counterInterval);
        this.clearInterval(this.animationInterval);

        this.setState({
            recordingScreenVisible: false,
        });

        this.endRecording();
    }

    closeScreen() {
        Animated.timing(this.state.bottom, {
            toValue: height,
            duration: 500,
            easing: Easing.linear
        }).start(() => {
            Actions.pop();
        });
    }

    circleAnimatingView() {
        if (this.state.showCircle) {
            const { scale } = this.state;
            return (
                <Animated.View
                    style={{
                        position: 'absolute',
                        backgroundColor: this.state.selectedColor,
                        bottom: -((size / 2) - 30),
                        left: 0,
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        transform: [{ scale }],
                    }}
                />
            );
        }
        return null;
    }


    playStopString() {
        if (this.state.playing) {
            return 'Stop';
        }
        return 'Asculta';
    }

    recordingScreenView() {
        if (this.state.recordingScreenVisible) {
            return (
                <View
                    style={{
                        alignSelf: 'stretch',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        backgroundColor: 'transparent'
                    }}
                >
                    <View
                        style={{
                            alignSelf: 'stretch',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                        }}
                    >
                        <Text style={styles.smallRecordingText}> Se inregistreaza </Text>
                        <Text style={styles.bigRecordingText}> {this.state.displayRecordingDuration} </Text>
                    </View>
                    <Button
                        style={{
                            height: 60,
                            width: 60,
                            backgroundColor: 'transparent',
                            borderRadius: 30,
                            borderWidth: 3,
                            borderColor: 'white',
                        }}
                        onPress={() => { this.stopRecording(); }}
                    >
                        <Image
                            source={require('../../resources/img/stop/Stop.png')}
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    </Button>
                </View>
            );
        }
        return null;
    }

    submittingScreenView() {
        if (this.state.submittingScreenVisible) {
            return (
                <View
                    style={{
                        flex: 1,
                        width
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            padding: 24
                        }}
                    >
                        <Text style={styles.infoTextStyle}> Alege maxim 3 taguri pentru duma ta. </Text>
                        <View style={styles.selectedTagsStyle}>
                            {this.state.selectedTagsViews}
                        </View>
                        <TagCloud
                            selectedTags={this.state.selectedTags}
                            onValueChanged={(selectedTags) => {
                                if (selectedTags.length < 4) {
                                    const tagViews = [];
                                    for (const tagName of selectedTags) {
                                        tagViews.push(
                                            <Tag
                                                small
                                                backgroundColor={this.state.backgroundViewColor}
                                                selected
                                                unselectable
                                                key={tagName}
                                            >
                                                {tagName}
                                            </Tag>
                                        );
                                    }
                                    this.setState({
                                        selectedTags,
                                        selectedTagsViews: tagViews
                                    });
                                }
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.playStop.bind(this)(); }}>
                            <Text style={styles.textStyle}> {this.playStopString()} </Text>
                        </TouchableOpacity>
                        <Button
                            style={{
                                height: 60,
                                width: 60,
                                backgroundColor: 'transparent',
                                borderRadius: 30,
                                borderWidth: 3,
                                borderColor: 'white',
                            }}
                            onPress={() => { this.submittingButtonPressed(); }}
                        >
                            <Image
                                source={require('../../resources/img/send/Send.png')}
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        </Button>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.closeScreen(); }}>
                            <Text style={styles.textStyle}> Renunta </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        return null;
    }

    render() {
        const { bottom } = this.state;
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'transparent',
                }}
            >
                <Animated.View
                    style={{
                        zIndex: 1,
                        position: 'absolute',
                        height,
                        bottom,
                        left: 0,
                        right: 0,
                        backgroundColor: this.state.backgroundViewColor,
                        alignSelf: 'stretch',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {this.submittingScreenView()}
                    {this.circleAnimatingView()}
                    {this.recordingScreenView()}
                </Animated.View >
            </View>
        );
    }
}

reactMixin(RecordScreen.prototype, TimerMixin);

const styles = {
    smallRecordingText: {
        color: 'white',
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 22,
        textAlign: 'center'
    },
    bigRecordingText: {
        color: 'white',
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 54,
        textAlign: 'center'
    },
    textStyle: {
        color: 'white',
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 14,
        textAlign: 'center',
    },
    infoTextStyle: {
        color: 'white',
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
    selectedTagsStyle: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
        borderRadius: 15,
        height: 40,
        padding: 8,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

const mapStateToProps = state => {
    return {
        profile: state.profile,
        // TODO: use this
        //submitting: state.submitting,
    };
};

export default connect(mapStateToProps, { startSubmitEntry, submitEntry })(RecordScreen);
