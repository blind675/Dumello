import firebase from 'react-native-firebase';

import {
    SUBMIT_NEW_ENTRY,
    SUBMITTED_NEW_ENTRY,
    UPLOAD_AUDIO_ERROR,
    SUBMIT_ENTRY_ERROR,
} from './types';

export const startSubmitEntry = () => {
    return { type: SUBMIT_NEW_ENTRY };
};

export const resetState = () => {
    return { type: 'reset' };
};

export const submitEntry = ({ filePath, audioFileName, entryColor, duration, tags }) => {
    // uploade audio to firebase
    const firebaseRef = firebase.storage().ref().child(`audio/${audioFileName}`);

    // create file metadata including the content type
    const metadata = {
        contentType: 'audio/aac',
    };

    return (dispatch, getState) => {
        firebaseRef
            .putFile(filePath, metadata)
            .then((snapshot) => {
                const { profile } = getState();
                // create new entry
                const newEntry = {
                    audioUrl: snapshot.downloadURL,
                    duration,
                    author: {
                        Id: profile.uid,
                        imageURL: profile.imageUrl,
                        name: profile.name,
                    },
                    color: entryColor,
                    creationDate: new Date().getTime(),
                    likeCount: 0,
                    listenCount: 0,
                    over18: false,
                    validated: false,
                    tags
                };
                // upload the new entry 
                const entryRef = firebase.database().ref('/entries').push();
                const entryKey = entryRef.key;
                entryRef
                    .set(newEntry)
                    .then(() => {
                        dispatch({ type: SUBMITTED_NEW_ENTRY });
                    })
                    .catch((error) => {
                        console.log(error);
                        dispatch({ type: SUBMIT_ENTRY_ERROR });
                    });

                tags.forEach((element) => {
                    const tagRef = firebase.database().ref('/tags').child(element);
                    tagRef.once('value').then((dataSnapshot) => {
                        let tagsRefList = dataSnapshot.val();
                        if (tagsRefList) {
                            tagsRefList.push(entryKey);
                        } else {
                            tagsRefList = [entryKey];
                        }
                        tagRef.set(tagsRefList);
                    });
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: UPLOAD_AUDIO_ERROR });
            });
    };
};
