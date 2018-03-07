import store from 'react-native-simple-store';
import { 
    STORE_AUTONEXT_KEY,
    AUTONEXT_LOAD,
    AUTONEXT_TOGLLE
    } from '../actions/types';

export default (state = false, action) => {
    const newState = !state;
    switch (action.type) {
        case AUTONEXT_LOAD:
            return action.payload || state;
        case AUTONEXT_TOGLLE:
            store.update(STORE_AUTONEXT_KEY, JSON.stringify(newState));
            return newState;
        default:
            return state;
    }
};
