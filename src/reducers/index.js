import { combineReducers } from 'redux';
import guardianReducer from './guardian.reducer';

export default combineReducers({
    guardians : guardianReducer
});
