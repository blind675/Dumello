// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.likeDislikeEntry = functions.https.onRequest((request, response) => {

    const action = request.query.performAction;
    const entryUid = request.query.entryUid;
    console.log('- EntryUid: ', entryUid);
    console.log('- performAction: ', action);

    var diference = 1;
    if (action==='UNLIKE') {
        diference=-1;
    }

    const ref = admin.database().ref(`/entries/${entryUid}`)
    return ref
        .once('value', (snapshot) => {
            var value = snapshot.val();
            ref.update({ likeCount: value.likeCount + diference }).then((snapshot) => {
                return response.send("SUCESS");
            }).catch((error) => {
                return response.send("WRITE_ENRTY_ERROR");
            });

            // get author profile
            const authorUid = value.author.Id
            const refAuthor = admin.database().ref(`/profiles/${authorUid}`)

            refAuthor.once('value', (snapshotAuthor) => {
                var valueAuthor = snapshotAuthor.val();
                refAuthor.update({likes: valueAuthor.likes + diference})
                .catch((error) => {
                    console.log("WRITE_PROFILE_ERROR");
                });
            }).catch((error) => {
                console.log("WRITE_PROFILE_ERROR");
            });
        }).catch((error) => {
            return response.send("WRITE_ENRTY_ERROR");
        });
});

