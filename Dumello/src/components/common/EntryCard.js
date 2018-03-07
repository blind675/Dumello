import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Player } from '../../Modules';
import { Button, Icon, Card, ProgressBar } from './';
import TagCloud from './TagCloud/TagCloud';
import * as actions from '../../actions';

const deviceWidth = Dimensions.get('window').width;
const reactMixin = require('react-mixin');

class EntryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            progress: 0,
            likedCount: props.entry.likeCount
        };
        this.interval = null;
    }

    playButtonPressed() {
        console.log(' play/stop ');
        Player.getStatus((error, info) => {
            if (info.status === 'PLAYING') {
                Player.stop();
                //change icon on button
                this.setState({ playing: false });
                clearInterval(this.interval);
            } else if (this.props.entry.audioUrl) {
                Player.play(this.props.entry.audioUrl);
                //change icon on button
                this.setState({ playing: true });
                this.interval = this.setInterval(() => {
                    Player.getStatus((newError, newInfo) => {
                        if (newError) {
                            Player.stop();
                            this.setState({ playing: false });
                            this.clearInterval(this.interval);
                            console.log(newError);
                        } else {
                            this.setState({ progress: newInfo.progress });
                            if (newInfo.status === 'STOPED') {
                                Player.stop();
                                this.setState({ playing: false });
                                this.clearInterval(this.interval);
                                // TODO: call an action to 
                                // determine if should play next 
                            }
                        }
                    });
                }, 300);
            }
        });
    }

    timeFromDate(postingDate) {
        const timeDiferenceSeconds = Math.floor((new Date().getTime() - postingDate) / 1000);

        let returnValue = 'acum';
        if (timeDiferenceSeconds < 60) {
            returnValue = `acum ${timeDiferenceSeconds} secunde`;
        } else if (timeDiferenceSeconds < 3600) {
            returnValue = `acum ${Math.floor(timeDiferenceSeconds / 60)} minute`;
        } else if (timeDiferenceSeconds < 86400) {
            returnValue = `acum ${Math.floor(timeDiferenceSeconds / 3600)} ore`;
        } else if (timeDiferenceSeconds < 2629743) {
            returnValue = `acum ${Math.floor(timeDiferenceSeconds / 86400)} zile`;
        } else {
            returnValue = `acum ${Math.floor(timeDiferenceSeconds / 2629743)} luni`;
        }
        return returnValue;
    }


    render() {
        const entryCardStyle = {
            height: 115,
            width: (deviceWidth - 28 - (this.props.small ? 36 : 0)),
            alignSelf: 'center',
            flexDirection: 'column',
            elevation: 1,
            backgroundColor: 'white',
            shadowColor: this.props.entry.color,
            marginHorizontal: 14,
            marginTop: 4,
            marginBottom: 12,
        };
        const buttonStyle = {
            height: 30,
            width: 64,
            backgroundColor: this.props.entry.color,
            alignSelf: 'center',
        };

        let playIcon;
        if (this.state.playing) {
            playIcon = (
                <Image
                    source={require('../../../resources/img/stop/Stop.png')}
                    style={{
                        width: 11,
                        height: 11,
                    }}
                />);
        } else {
            playIcon = (
                <Image
                    source={require('../../../resources/img/play/Play.png')}
                    style={{
                        width: 9,
                        height: 11,
                    }}
                />);
        }

        return (
            <Card style={entryCardStyle}>
                <View style={styles.entryCardTopStyle}>
                    <Image
                        source={{ uri: this.props.entry.author.imageURL }}
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                        }}
                    />
                    <View style={styles.entryCardTopMiddleStyle}>
                        <TagCloud
                            backgroundColor={this.props.entry.color}
                            small
                            unselectable
                            tags={this.props.entry.tags}
                            selectedTags={this.props.entry.tags}
                        />
                        <Text style={styles.authorTextStyle}>
                            {this.props.entry.author.name} - {this.timeFromDate(this.props.entry.creationDate)}
                        </Text>
                    </View>
                    <Button
                        style={buttonStyle}
                        onPress={this.playButtonPressed.bind(this)}
                    >
                        {playIcon}
                    </Button>
                </View >
                <View style={{ flexDirection: 'column' }} >
                    <ProgressBar
                        color={this.props.entry.color}
                        maxValue={this.props.entry.duration}
                        currentValue={this.state.progress}
                    />
                    <View style={styles.entryCardBottomStyle}>
                        <Icon
                            source={require('../../../resources/img/like/Heart.png')}
                            style={{
                                height: 30,
                                width: 30,
                                margin: 0,
                            }}
                            toggleType
                            active={(this.props.profile &&
                                this.props.profile.likedEntries &&
                                this.props.entry &&
                                this.props.profile.likedEntries.includes(this.props.entry.uid))}
                            activeColor={this.props.entry.color}
                            activeImage={require('../../../resources/img/like_active/Heart_full.png')}
                            onPressIn={() => {
                                if (!this.props.profile) {
                                    Actions.login();
                                }
                            }}
                            onPress={(status) => {
                                console.log('Like status: ', status);
                                if (this.props.profile) {
                                    this.props.likeDislike({ entryUID: this.props.entry.uid });
                                }
                                // update like number
                                if (status) {
                                    this.setState({
                                        likedCount: this.state.likedCount + 1
                                    }); 
                                } else {
                                    this.setState({
                                        likedCount: this.state.likedCount - 1
                                    });
                                }
                            }}
                        />
                        <Text style={[styles.entryCardStatsTextStyle, { marginHorizontal: 0 }]}>
                            {this.state.likedCount}
                        </Text>
                        <Image
                            source={require('../../../resources/img/listen/Listened.png')}
                            style={{
                                height: 15,
                                width: 10.45,
                            }}
                        />
                        <Text style={styles.entryCardStatsTextStyle}>
                            {this.props.entry.listenCount}
                        </Text>
                        <View style={{ flex: 1 }} />
                        <Icon source={require('../../../resources/img/share/Share.png')} />
                        <Icon source={require('../../../resources/img/menu/Menu.png')} />
                    </View>
                </View>
            </Card>
        );
    }
}

reactMixin(EntryCard.prototype, TimerMixin);

const styles = {
    entryCardTopStyle: {
        flexDirection: 'row',
        height: 64,
        paddingTop: 12,
        paddingBottom: 6,
        paddingHorizontal: 6,
    },
    entryCardTopMiddleStyle: {
        flex: 1,
    },
    authorTextStyle: {
        color: '#A8A8A8',
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 12,
        paddingHorizontal: 6,
    },
    entryCardBottomStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        paddingLeft: 12,
    },
    entryCardStatsTextStyle: {
        marginHorizontal: 5,
        width: 30,
        color: '#393939',
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 13,
    }

};

const mapStateToProps = state => {
    return {
        profile: state.profile,
    };
};

export default connect(mapStateToProps, actions)(EntryCard);
