import {
    SUBMIT_NEW_ENTRY,
    SUBMITTED_NEW_ENTRY,
    UPLOAD_AUDIO_ERROR,
    SUBMIT_ENTRY_ERROR,
} from '../actions/types';

const INITIAL_STATE = { state: 'none', storedOffline: 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUBMIT_NEW_ENTRY:
            return { state: 'submitting', storedOffline: 0 };
        case SUBMITTED_NEW_ENTRY:
            return { state: 'sucess', storedOffline: 0 };
        case UPLOAD_AUDIO_ERROR:
            return { state: 'upload_error', storedOffline: 0 };
        case SUBMIT_ENTRY_ERROR:
            return { state: 'submit_error', storedOffline: 0 };
        default:
            return state;
    }
};
