import firebase from 'react-native-firebase';

import {
    ENTRIES_NEW_RECEIVED,
} from './types';

export const newEntriesLoad = () => {
    return (dispatch) => {
        firebase.database().ref('/entries')
            .limitToLast(5)
            .on('child_added', snapshot => {
                // append key
                const payload = { ...snapshot.val(), uid: snapshot.key };
                dispatch({ type: ENTRIES_NEW_RECEIVED, payload });
            });
    };
};
