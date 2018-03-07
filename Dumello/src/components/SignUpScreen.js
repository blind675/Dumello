import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import { BackButton, Button } from './common';
import * as actions from '../actions';

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordError: null,
            rePasswordError: null
        };

        this.nameRef = this.updateRef.bind(this, 'nameRef');
        this.emailRef = this.updateRef.bind(this, 'emailRef');
        this.passwordRef = this.updateRef.bind(this, 'passwordRef');
        this.rePasswordRef = this.updateRef.bind(this, 'rePasswordRef');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile) {
            Actions.pop;
        }
    }

    onEmailChange(text) {
        this.state.email = text;
    }

    onNameChange(text) {
        this.state.name = text;
    }

    onPasswordChange(text) {
        this.state.password = text;
        if (this.state.password.length > 0 && this.state.password.length < 6) {
            this.setState({ passwordError: 'Minim 6 caractere' });
        } else {
            this.setState({ passwordError: null });
        }
    }

    onPasswordCheckChange(text) {
        this.state.rePassword = text;
        if (this.state.rePassword && this.state.rePassword !== this.state.password) {
            this.setState({ rePasswordError: 'Parolele nu sunt la fel' });
        } else {
            this.setState({ rePasswordError: null });
        } 
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    signButtonPressed() {
        if (this.state.name && this.state.email && this.state.password && this.state.rePassword) {
            this.props.createAccount(
                {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
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
            topPart,
            middelPart,
            bottomPart,
            whiteButtonTextStyle
        } = styles;

        return (
            <View
                style={{
                    paddingTop: 20,
                    backgroundColor: '#FFBE1A',
                    flex: 1,
                    flexDirection: 'column',
                }}
            >
                <View style={topPart} >
                    <BackButton />
                </View>
                <View style={middelPart} >
                    <View style={{ alignSelf: 'center', backgroundColor: '#FFBE1A', width: 200 }}>
                        <TextField
                            ref={this.nameRef}
                            label='Nume'
                            textColor='#fff'
                            autoCorrect={false}
                            onChangeText={this.onNameChange.bind(this)}
                            onSubmitEditing={() => {
                                this.emailRef.focus();
                            }}
                        />
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
                            onSubmitEditing={() => {
                                this.rePasswordRef.focus();
                            }}
                            error={this.state.passwordError}
                        />
                        <TextField
                            ref={this.rePasswordRef}
                            label='Reintroduceti Parola'
                            textColor='#fff'
                            autoCorrect={false}
                            onChangeText={this.onPasswordCheckChange.bind(this)}
                            secureTextEntry
                            error={this.state.rePasswordError}
                        />
                    </View>
                </View>
                <View style={bottomPart}>
                    <Button style={{ margin: 6, height: 45, }} onPress={this.signButtonPressed.bind(this)}>
                        <Text style={buttonTextStyle}>Logheaza-ma</Text>
                    </Button>
                    <TouchableOpacity style={{ margin: 63 }} onPress={Actions.pop}>
                        <Text style={whiteButtonTextStyle}> Am cont, vreau sa ma loghinez. </Text>
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
    buttonStyle: {
        marginTop: 20,
        marginBottom: 15,
        height: 50,
        width: 250,
        backgroundColor: '#fff',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: '#fff',
        alignSelf: 'center'
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
        flex: 1,
    },
};

const mapStateToProps = state => {
    return {
        profile: state.profile,
    };
};

export default connect(mapStateToProps, actions)(SignUpScreen);
