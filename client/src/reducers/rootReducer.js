import { combineReducers } from 'redux';
import authReducer from './authReducer';
import documents from './documentReducer';

const rootReducer = combineReducers({
  documents,
  authReducer
});

export default rootReducer;
