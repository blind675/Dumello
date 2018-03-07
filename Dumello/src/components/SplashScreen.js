import React, { Component } from 'react';
import { Image, Dimensions, } from 'react-native';
import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import TimerMixin from 'react-timer-mixin';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { 
    STORE_AUTONEXT_KEY,
    STORE_TAGS_KEY,
} from '../actions/types';

const reactMixin = require('react-mixin');

class SplashScreen extends Component {
    componentWillMount() {
        // load user profile
        this.props.loadProfile();

        // load newest 5 entryes
        this.props.newEntriesLoad();

        store
            .get(STORE_AUTONEXT_KEY)
            .then((autoNext) => {
                const isTrueSet = (autoNext === 'true');
                this.props.autoNextLoad(isTrueSet);
                return store.get(STORE_TAGS_KEY);
            })
            .then((tags) => {
                this.props.tagsLoad(tags || []);
                this.props.selectedEntriesLoad(tags || []);
                // TODO: remove the delay if app gest slower.. maybe progress bar ??
                this.setTimeout(() => { Actions.mainHome(); }, 500);
            });          
            // TODO: chain loading from user defaults here   
    }

    render() {
        return (
            <Image 
                source={require('../../resources/img/splash/Splash.png')} 
                style={{ 
                    height: deviceHeight,
                    width: deviceWidth }}
            />
        );
    }
}

reactMixin(SplashScreen.prototype, TimerMixin);

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default connect(null, actions)(SplashScreen);
