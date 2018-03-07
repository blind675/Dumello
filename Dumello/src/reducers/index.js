import { combineReducers } from 'redux';
import AutoNextReducer from './AutoNextReducer';
import TagsReducers from './TagsReducers';
import NewEntriesReducer from './NewEntriesReducer';
import SelectedEntriesReducer from './SelectedEntriesReducer';
import ProfileReducer from './ProfileReducer';
import SubmitReducer from './SubmitReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
    profile: ProfileReducer,
    autoNext: AutoNextReducer,
    tags: TagsReducers,
    newEntries: NewEntriesReducer,
    selectedEntries: SelectedEntriesReducer,
    submitting: SubmitReducer,
    searchList: SearchReducer,
});
