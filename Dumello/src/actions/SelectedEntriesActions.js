import firebase from 'react-native-firebase';
import _ from 'lodash';

import {
    ENTRIES_SELECTED_RECEIVED,
} from './types';

export const selectedEntriesLoad = (value) => {
    return (dispatch) => {
        // if no tags selected get first 10 entryes
        // TODO: change 10 to pagination 
        if (value.length === 0) {
            firebase.database().ref('/entries')
                .limitToFirst(10)
                .once('value', snapshot => {
                    // append key
                    const payload = _.map(snapshot.val(), (val, uid) => {
                        return { ...val, uid };
                    });
                    dispatch({ type: ENTRIES_SELECTED_RECEIVED, payload });
                });
        } else {
            // get the tags lists for selected tags
            const tagsPromises = value.map(id =>
                firebase.database().ref('/tags').child(id)
                    .once('value', s => s)
            );
            Promise.all(tagsPromises)
                .then(idsForTags => {
                    // merge lists so that posts that have more tags are first
                    const entriesIdsMap = [];

                    for (const snapshotFromTag of idsForTags) {
                        if (snapshotFromTag.val()) {
                            for (const entryId of snapshotFromTag.val()) {
                                const entryKey = _.find(entriesIdsMap, ['id', entryId]);
                                if (entryKey) {
                                    entryKey.count++;
                                    entriesIdsMap.push(entryKey);
                                } else {
                                    entriesIdsMap.push({
                                        id: entryId,
                                        count: 1,
                                    });
                                }
                            }
                        }
                    }

                    // TODO: save the list in some state or somthing
                    // get the first 10 elements from new entries list

                    const keys = _.take(
                        _.uniqBy(entriesIdsMap)
                            .sort((a, b) => {
                                if (a.count > b.count) {
                                    return -1;
                                }
                                if (a.count < b.count) {
                                    return 1;
                                }
                                return 0;
                            }).map(key => key.id),
                        10);

                    const entriesPromises = keys.map(id =>
                        firebase.database().ref('/entries').child(id).once('value', s => s)
                    );
                    Promise.all(entriesPromises)
                        .then(entriesSnapshots => {
                            dispatch({
                                type: ENTRIES_SELECTED_RECEIVED,
                                payload: _.without(entriesSnapshots
                                    .map(entrySnapshot => {
                                        if (entrySnapshot.val()) {
                                            return { ...entrySnapshot.val(), uid: entrySnapshot.key };
                                        }
                                        return null;
                                    }), null)
                            });
                        })
                        .catch(err => {
                            // handle error
                            console.log(err);
                        });
                })
                .catch(err => {
                    // handle error
                    console.log(err);
                });
        }
    };
};
