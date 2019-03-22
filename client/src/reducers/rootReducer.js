import { combineReducers } from 'redux';
import authReducer from './authReducer';
import documents from './documentReducer';
import users from './usersReducers';
import roles from './roleReducer';

const rootReducer = combineReducers({
  documents,
  authReducer,
  users,
  roles
});

export default rootReducer;
