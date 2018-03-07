import firebase from 'react-native-firebase';
import _ from 'lodash';
import store from 'react-native-simple-store';

import {
    STORE_PROFILE_KEY,
} from './types';

export const likeDislike = ({ entryUID }) => {
    return (dispatch, getState) => {
        const { profile } = getState();
        let performAction = 'LIKE';

        if (!profile.likedEntries) {
            profile.likedEntries = [];
        }
        if (profile.likedEntries.includes(entryUID)) {
            //remove the entry from profile list
            _.remove(profile.likedEntries, (n) => {
                return n === entryUID;
            });
            performAction = 'UNLIKE';
        } else {
            //add the entry to profile list
            profile.likedEntries.push(entryUID);
            performAction = 'LIKE';
        }

        // save new user on device 
        saveProfile(profile);
        // save new user on firebase
        firebase.database().ref(`/profiles/${profile.uid}`)
            .update({ likedEntries: profile.likedEntries });
        // function extension
        
        const api = `https://us-central1-dumello-be453.cloudfunctions.net/likeDislikeEntry?entryUid=${entryUID}&performAction=${performAction}`;
        fetch(api)
            .then((response) => console.log(response))
            .done();
    };
};

const saveProfile = (profile) => {
    store.save(STORE_PROFILE_KEY, profile);
};
