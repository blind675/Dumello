import { 
    TAGS_SELECTED,
    TAGS_LOAD,
} from '../actions/types'; 

export default (state = [], action) => {
    switch (action.type) {
        case TAGS_LOAD:
            return action.payload || state;
        case TAGS_SELECTED:
            return action.payload.slice(0);
        default:
            return state;
    }
};
