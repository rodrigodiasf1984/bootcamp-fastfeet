import { combineReducers } from 'redux';
import auth from './auth/reducer';
import deliveries from './deliveries/reducer';

export default combineReducers({
  auth,
  deliveries,
});
