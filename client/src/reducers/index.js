import { combineReducers } from 'redux';
import photoCard from './photoCard';
import user from './user';

const reducer = combineReducers({
    photoCard,
    user
});

export default reducer