import {
    USER_PROFILE_RECEIVED,
    USER_PROFILE_GET_FAIL,
    USER_PROFILE_CREATE_FAIL,
    USER_LOG_IN_FAIL,
    USER_SIGN_IN_FAIL,
} from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_PROFILE_RECEIVED:
            console.log(action.payload);
            return action.payload;
        case USER_PROFILE_GET_FAIL || USER_LOG_IN_FAIL || USER_SIGN_IN_FAIL || USER_PROFILE_CREATE_FAIL:
            return null;
        default:
            return state;
    }
};
