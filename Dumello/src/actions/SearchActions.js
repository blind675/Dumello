import firebase from 'react-native-firebase';
import _ from 'lodash';

import {
    SEARCH_ENTRIES_SUCCESS,
    SEARCH_ENTRIES_CLEAR,
    SEARCH_ENTRIES_ERROR,
} from './types';

export const searchNewest = () => {
    return (dispatch) => {
        firebase.database().ref('/entries')
        .limitToFirst(10)
        .orderByChild('creationDate')
        .once('value', snapshot => {
            // append key
            const payload = _.map(snapshot.val(), (val, uid) => {
                return { ...val, uid };
            });
            dispatch({ type: SEARCH_ENTRIES_SUCCESS, payload });
        })
        .catch(err => {
            // handle error
            console.log(err);
            dispatch({ type: SEARCH_ENTRIES_ERROR });
        });
    };
};

export const searchFunniest = () => {
    return (dispatch) => {
        firebase.database().ref('/entries')
        .limitToFirst(10)
        .orderByChild('likeCount')
        .once('value', snapshot => {
            // append key
            const payload = _.map(snapshot.val(), (val, uid) => {
                return { ...val, uid };
            });
            dispatch({ type: SEARCH_ENTRIES_SUCCESS, payload });
        })
        .catch(err => {
            // handle error
            console.log(err);
            dispatch({ type: SEARCH_ENTRIES_ERROR });
        });
    };
};

export const searchMostShared = () => {
    return (dispatch) => {
        firebase.database().ref('/entries')
        .limitToFirst(10)
        .orderByChild('shareCount')
        .once('value', snapshot => {
            // append key
            const payload = _.map(snapshot.val(), (val, uid) => {
                return { ...val, uid };
            });
            dispatch({ type: SEARCH_ENTRIES_SUCCESS, payload });
        })
        .catch(err => {
            // handle error
            console.log(err);
            dispatch({ type: SEARCH_ENTRIES_ERROR });
        });
    };
};

export const clearSearchList = () => {
    return { type: SEARCH_ENTRIES_CLEAR }; 
};
