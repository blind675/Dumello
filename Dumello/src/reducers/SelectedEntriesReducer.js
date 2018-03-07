import {
    ENTRIES_SELECTED_RECEIVED
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ENTRIES_SELECTED_RECEIVED:
            return action.payload;
        default:
            return state;
    }
};
