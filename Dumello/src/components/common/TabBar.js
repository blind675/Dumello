import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class TabBar extends Component {
    profileIcon() {
        if (this.props.profile) {
            const { imageUrl } = this.props.profile;
            return (
                <View>
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.profileIconStyle}
                    />
                </View>);
        }

        return (
            <Image
                source={require('../../../resources/img/user/User.png')}
                style={{
                    width: 16,
                    height: 18
                }}
            />);
    }

    render() {
        return (
            <View style={styles.tabBarStyle}>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 50,
                        backgroundColor: '#FFFFFF',
                        shadowColor: '#000',
                        shadowOpacity: 0.12
                    }}
                />
                <TouchableOpacity
                    onPress={() => Actions.home()}
                    style={{
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}
                >
                    <Image
                        source={require('../../../resources/img/home/Home.png')}
                        style={{
                            width: 20,
                            height: 18
                        }}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        backgroundColor: '#FFFFFF',
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        shadowColor: '#000',
                        shadowOpacity: 0.12,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            if (this.props.profile) {
                                Actions.record();
                            } else {
                                Actions.login();
                            }
                        }}
                    >
                        <Image
                            source={require('../../../resources/img/record/Record.png')}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        if (this.props.profile) {
                            Actions.profile();
                        } else {
                            Actions.login();
                        }
                    }}
                    style={{
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}
                >
                    {this.profileIcon()}
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        height: 60,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    profileIconStyle: {
        width: 30,
        height: 30,
        borderRadius: 15,
    }
};

const mapStateToProps = state => {
    return {
        profile: state.profile,
    };
};

export default connect(mapStateToProps, null)(TabBar);
