import {
    SEARCH_ENTRIES_SUCCESS,
    SEARCH_ENTRIES_CLEAR,
    SEARCH_ENTRIES_ERROR,
} from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_ENTRIES_SUCCESS:
            return action.payload;
        case SEARCH_ENTRIES_CLEAR:
            return null;
        case SEARCH_ENTRIES_ERROR:
            return null;
        default:
            return state;
    }
};
