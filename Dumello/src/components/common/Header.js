import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { MessageBarManager } from 'react-native-message-bar';
import { Switch } from './Switch';
import * as actions from '../../actions';

class Header extends Component {
    drawInfoIndicator() {
        let message;
        let backgroundColor;
        let clearState = false;
        switch (this.props.submitting.state) {
            case 'submitting':
                message = 'Duma ta se posteaza dupa ca ne radem de ea.';
                backgroundColor = '#FFBE1A';
                clearState = false;
                break;
            case 'sucess':
                message = 'Duma ta e online. Noi ne-am amuzat.';
                backgroundColor = '#02D174';
                clearState = true;
                break;
            case 'upload_error':
                message = 'Duma nu sa putut uploda pe server.';
                backgroundColor = '#FF5454';
                clearState = true;
                break;
            case 'submit_error':
                message = 'Duma nu sa putut uploda pe server.';
                backgroundColor = '#FF5454';
                clearState = true;
                break;
            default:
        }

        if (this.props.submitting.state !== 'none') {
            MessageBarManager.showAlert({
                title: ' ', // Title of the alert
                message,
                stylesheetInfo: {
                    backgroundColor,
                    strokeColor: '#FF8133'
                },
                messageStyle: {
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Arial Rounded MT Bold',
                },
                viewBottomOffset: 10,
                alertType: 'info',
                position: 'top',
                animationType: 'SlideFromTop',
                duration: 5000,
                onHide: () => {
                    if (clearState === true) {
                        this.props.resetState();
                    }
                }
            });
        }
    }

    renderSwitch() {
        return (
            <Switch
                defaultValue={this.props.autoNext}
                value={this.props.autoNext}
                onChangeValue={(value) => {
                    this.props.autoNextToggle();

                    const alertText = value ?
                        'Ai activat trecere automata la urmatoarea duma. Sa curga cu rasate.' :
                        'Ai dezactivat trecerea automata la urmatoarea duma. Ce trist.';
                    MessageBarManager.showAlert({
                        title: ' ', // Title of the alert
                        message: alertText, // Message of the alert
                        stylesheetInfo: {
                            backgroundColor: 'rgba(255, 129, 51, 0.9)',
                            strokeColor: '#FF8133'
                        },
                        messageStyle: {
                            color: 'white',
                            fontSize: 16,
                            fontFamily: 'Arial Rounded MT Bold',
                        },
                        viewBottomOffset: 10,
                        alertType: 'info',
                        position: 'top',
                        animationType: 'SlideFromTop',
                        duration: 5000
                    });
                }}
                activeText={'A'}
                inactiveText={'D'}
                fontSize={14}
                activeTextColor={'#FF8133'}
                inactiveTextColor={'#B8B8B8'}
                activeBackgroundColor={'#FFFFFF'}
                inactiveBackgroundColor={'#FFFFFF'}
                activeButtonBackgroundColor={'#FF8133'}
                inactiveButtonBackgroundColor={'#B8B8B8'}
                switchWidth={50}
                switchHeight={28}
                switchBorderRadius={14}
                switchBorderColor={'#E7E7E7'}
                switchBorderWidth={1}
                buttonWidth={28}
                buttonHeight={28}
                buttonBorderRadius={14}
                buttonBorderColor={'#C7C7C7'}
                buttonBorderWidth={1}
                animationTime={100}
                padding={false}
            />
        );
    }

    renderBackButton() {
        return (
            <TouchableOpacity
                onPress={() => Actions.pop()}
            >
                <Text
                    style={{
                        fontFamily: 'Arial Rounded MT Bold',
                        fontSize: 14,
                    }}
                > {'< Inapoi'} </Text>
            </TouchableOpacity>
        );
    }

    renderLeftCorner() {
        if (this.props.showBackButton) {
            return this.renderBackButton();
        }
        if (this.props.hideSwitch) {
            return <View style={{ width: 50 }} />;
        }

        return this.renderSwitch();
    }

    render() {
        return (
            <View style={styles.headerStyle}>
                {this.drawInfoIndicator()}
                {this.renderLeftCorner()}
                <Text style={styles.textStyle}> Dumello </Text>
                <TouchableOpacity
                    onPress={() => Actions.search()}
                    style={styles.buttonStyle}
                >
                    <Image
                        source={require('../../../resources/img/search/Search.png')}
                        style={{
                            width: 18,
                            height: 18
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    textStyle: {
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 22,
        color: '#393939',
        textAlign: 'center',
        marginRight: 20,
        flex: 1,
    },
    buttonStyle: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingLeft: 10,
    },
    headerStyle: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 5,
        paddingHorizontal: 14,
        // TODO: set this based on platform ( screen size)
        paddingTop: 30,
        height: 70,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'relative',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 2 },
    }
};

const mapStateToProps = state => {
    return {
        autoNext: state.autoNext,
        submitting: state.submitting,
    };
};

export default connect(mapStateToProps, actions)(Header);
