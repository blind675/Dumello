import { 
    AUTONEXT_LOAD,
    AUTONEXT_TOGLLE
    } from './types';

export const autoNextLoad = (value) => {
    return {
        type: AUTONEXT_LOAD,
        payload: value
    };
};

export const autoNextToggle = () => {
    return {
        type: AUTONEXT_TOGLLE
    };
};
