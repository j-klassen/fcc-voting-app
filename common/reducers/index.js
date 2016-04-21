import { combineReducers } from 'redux';

import poll from './poll';
import polls from './polls';
import auth from './auth';

const rootReducer = combineReducers({
	auth,
	poll,
	polls
});

export default rootReducer;
