import { combineReducers } from 'redux';

import profile from './profile';
import user from './user';
import users from './users';

const rootReducer = combineReducers({
	profile,
	user,
	users
});

export default rootReducer;
