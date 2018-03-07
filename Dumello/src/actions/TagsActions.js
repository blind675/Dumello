import store from 'react-native-simple-store';
import { 
    STORE_TAGS_KEY,
    TAGS_SELECTED,
    TAGS_LOAD
} from './types';

export const tagsSelected = (value) => {
    store.save(STORE_TAGS_KEY, value);
    return {
        type: TAGS_SELECTED,
        payload: value
    };
};

export const tagsLoad = (value) => {
    return {
        type: TAGS_LOAD,
        payload: value
    };
};
