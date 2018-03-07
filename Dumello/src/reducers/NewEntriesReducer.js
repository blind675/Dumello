import {
    ENTRIES_NEW_RECEIVED
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ENTRIES_NEW_RECEIVED:
            return [action.payload, ...state.slice(0, 4)];
        default:
            return state;
    }
};
