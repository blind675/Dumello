import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import { BackButton, Button } from './common';
import * as actions from '../actions';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
        this.emailRef = this.updateRef.bind(this, 'emailRef');
        this.passwordRef = this.updateRef.bind(this, 'passwordRef');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile) {
            Actions.pop();
        }
    }

    onEmailChange(text) {
        this.state.email = text;
    }

    onPasswordChange(text) {
        this.state.password = text;
        if (this.state.password.length > 0 && this.state.password.length < 6) {
            this.setState({ error: 'Minim 6 caractere' });
        } else {
            this.setState({ error: null });
        }
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    loginButtonPressed() {
        if (this.state.email && this.state.password) {
            this.props.login({
                email: this.state.email,
                password: this.state.password,
            });
        } else {
            Alert.alert(
                'Problema',
                'Nu sunt completoate toate campurile.',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: true }
            );
        }
    }

    render() {
        const {
            buttonTextStyle,
            facebookButtonStyle,
            whiteButtonTextStyle,
            topPart,
            middelPart,
            bottomPart } = styles;

        return (
            <View
                style={{
                    paddingTop: 20,
                    backgroundColor: '#FFBE1A',
                    flex: 1,
                    alignItems: 'center'
                }}
            >
                <View style={topPart} >
                    <BackButton />
                </View>
                <View style={middelPart} >
                    <Image
                        style={{ height: 208, width: 241 }}
                        source={require('../../resources/Asset_2_2x.png')}
                    />
                    <View >
                        <TextField
                            ref={this.emailRef}
                            label='E-mail'
                            textColor='#fff'
                            autoCorrect={false}
                            onChangeText={this.onEmailChange.bind(this)}
                            onSubmitEditing={() => {
                                this.passwordRef.focus();
                            }}
                        />
                        <TextField
                            ref={this.passwordRef}
                            label='Parola'
                            textColor='#fff'
                            autoCorrect={false}
                            onChangeText={this.onPasswordChange.bind(this)}
                            secureTextEntry
                            error={this.state.error}
                        />
                    </View>
                </View>
                <View style={bottomPart}>
                    <Button style={{ margin: 6, height: 45, }} onPress={this.loginButtonPressed.bind(this)}>
                        <Text style={buttonTextStyle}>Logheaza-ma</Text>
                    </Button>
                    <Button
                        style={[facebookButtonStyle, { margin: 6 }]}
                        onPress={() => this.props.facebookLogin()}
                    >
                        <Text style={whiteButtonTextStyle}>Logheaza-ma cu Facebook</Text>
                    </Button>
                    <TouchableOpacity style={{ margin: 6 }} onPress={Actions.signUp}>
                        <Text style={whiteButtonTextStyle}> Nu am cont, vreau sa ma inscriu. </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = {

    topPart: {
        alignSelf: 'flex-start',
        paddingVertical: 8,
    },
    middelPart: {
        flex: 1,
        justifyContent: 'space-around',
    },
    bottomPart: {
        height: 180,
        padding: 12,
        alignItems: 'center',
    },
    facebookButtonStyle: {
        height: 45,
        backgroundColor: '#4A90E2',
        borderRadius: 70,
        borderColor: '#4A90E2'
    },
    buttonTextStyle: {
        color: '#4A4A4A',
        fontSize: 14,
        fontFamily: 'Arial Rounded MT Bold',

    },
    whiteButtonTextStyle: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Arial Rounded MT Bold',
    },

};

const mapStateToProps = state => {
    return {
        profile: state.profile,
    };
};

export default connect(mapStateToProps, actions)(LoginScreen);
