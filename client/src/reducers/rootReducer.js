import { combineReducers } from 'redux';
import authReducer from './authReducer';
import documents from './documentReducer';
import users from './usersReducers';

const rootReducer = combineReducers({
  documents,
  authReducer,
  users
});

export default rootReducer;
