import { combineReducers } from 'redux';
import auth from './auth/reducer';
import user from './user/reducer';
import edit from './edit/reducer';

export default combineReducers({
  auth,
  user,
  edit,
});
