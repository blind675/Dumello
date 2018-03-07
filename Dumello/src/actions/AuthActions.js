import firebase from 'react-native-firebase';
import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
// import { FBLoginManager } from 'react-native-facebook-login';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import {
    STORE_PROFILE_KEY,
    USER_PROFILE_RECEIVED,
    USER_PROFILE_GET_FAIL,
    USER_PROFILE_CREATE_FAIL,
    USER_LOG_IN_FAIL,
    USER_SIGN_IN_FAIL,
} from './types';

export const login = ({ email, password }) => {
    return (dispatch) => {
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(() => {
                const { currentUser } = firebase.auth();

                firebase.database().ref(`/profiles/${currentUser.uid}`)
                    .once('value', snapshot => {
                        const profile = { ...snapshot.val(), uid: currentUser.uid, password };
                        //save profile
                        console.log(' - Loaded remote user profile: ', profile);
                        saveProfile(profile);
                        dispatch({ type: USER_PROFILE_RECEIVED, payload: profile });
                    })
                    .catch((error) => {
                        console.log('error:', error);
                        dispatch({ type: USER_PROFILE_GET_FAIL });
                    });
            })
            .catch((error) => {
                console.log('error:', error);
                dispatch({ type: USER_LOG_IN_FAIL });
            });
    };
};

export const facebookLogin = () => {
    return (dispatch) => {
        LoginManager.logInWithReadPermissions(['email', 'public_profile'])
            .then((result) => {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            console.log(data);
                            const token = data.accessToken.toString();
                            const userId = data.userID.toString();
                            const credential = firebase.auth.FacebookAuthProvider.credential(token);
                            firebase.auth().signInAndRetrieveDataWithCredential(credential)
                                .then(() => {
                                    const api = `https://graph.facebook.com/v2.3/${userId}?fields=name,email&access_token=${token}`;
                                    fetch(api)
                                        .then((response) => response.json())
                                        .then((responseData) => {
                                            createFirebaseProfil(responseData.name, responseData.email, 'none', dispatch);
                                        })
                                        .done();
                                })
                                .catch((signInError) => {
                                    console.log(signInError);
                                });
                        }
                    );
                }
            })
            .catch((error) => {
                console.log('Login fail with error: ', error);
            });
    };
};

export const createAccount = ({ name, email, password }) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                createFirebaseProfil(name, email, password, dispatch);
            })
            .catch((error) => {
                console.log('error:', error);
                dispatch({ type: USER_SIGN_IN_FAIL });
            });
    };
};

const createFirebaseProfil = (name, email, password, dispatch) => {
    const { currentUser } = firebase.auth();
    const ref = firebase.database().ref(`/profiles/${currentUser.uid}`);

    ref.once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                //success
                const profile = snapshot.val();
                saveProfile(profile);
                dispatch({ type: USER_PROFILE_RECEIVED, payload: profile });
                Actions.mainHome();
            } else {
                const profileObject = {
                    name,
                    email,
                    imageUrl: getRandomProfileURL(),
                    followers: 0,
                    likes: 0,
                    creationDate: new Date().toDateString(),
                    likedEntries: []
                };
                console.log('sign up', profileObject);
                ref.set(profileObject)
                    .then(() => {
                        const profile = { ...profileObject, uid: currentUser.uid, password };
                        //save profile
                        saveProfile(profile);
                        dispatch({ type: USER_PROFILE_RECEIVED, payload: profile });
                        Actions.mainHome();
                    })
                    .catch((error) => {
                        console.log('error:', error);
                        dispatch({ type: USER_PROFILE_CREATE_FAIL });
                    });
            }
        })
        .catch((error) => {
            console.log('error:', error);
            dispatch({ type: USER_PROFILE_GET_FAIL });
        });
};

export const loadProfile = () => {
    return (dispatch) => {
        store.get(STORE_PROFILE_KEY)
            .then((profile) => {
                console.log(' - Loaded local user profile: ', profile);
                if (profile) {
                    dispatch({ type: USER_PROFILE_RECEIVED, payload: profile });
                    login({ email: profile.email, password: profile.password });
                } else {
                    dispatch({ type: USER_PROFILE_GET_FAIL });
                }
            })
            .catch((error) => {
                console.log('error:', error);
                dispatch({ type: USER_PROFILE_GET_FAIL });
            });
    };
};

const saveProfile = (profile) => {
    store.save(STORE_PROFILE_KEY, profile);
};

const getRandomProfileURL = () => {
    const PROFILE_PICTURES = [
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/series_15/thumbnail/1/336x448_s15_characters_animalcontrole.jpg?l.r2=-1954332222',
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/series%2016/thumbs/336x448_s16_penguineguy.jpg?l.r2=2042622183',
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/series%2016/thumbs/336x448_s16_bananaguy.jpg?l.r2=397569435',
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/series%2016/thumbs/336x448_s16_devilboy.jpg?l.r2=1159778684',
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/batman/336x448_marchharriet.jpg?l.r2=-1895612986',
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/batman/336x448_nurseharley.jpg?l.r2=56780731',
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/batman/336x448_joker.jpg?l.r2=375103697',
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/series%2017/336x448/336x448_yuppie.png?l.r2=1036153581',
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/series%2017/336x448/336x448_vet.png?l.r2=-1481261788',
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/series%2017/336x448/336x448_rocketboy.png?l.r2=738555012',
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/series%2017/336x448/336x448_fitnessinstructor.png?l.r2=-1924230277',
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/series%2017/336x448/336x448_corncubguy.png?l.r2=-1166115173',
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/series%2017/336x448/336x448_butterflygirl.png?l.r2=-959018116',
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/the%20lego%20ninjago%20movie/characters%20thumb/336x448_torso_popgirl.jpg?l.r2=-1053707560',
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/the%20lego%20ninjago%20movie/characters%20thumb/336x448_torso_gpl_tech.jpg?l.r2=-868347971',
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/the%20lego%20ninjago%20movie/characters%20thumb/336x448_torso_misako.jpg?l.r2=533916842',
        'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/minifigures/the%20lego%20ninjago%20movie/characters%20thumb/336x448_torso_jay_walker.jpg?l.r2=96403817',
    ];
    return PROFILE_PICTURES[getRandomInt(0, PROFILE_PICTURES.length)];
};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
};
