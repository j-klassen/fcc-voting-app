import { combineReducers } from 'redux';

import profile from './profile';
import poll from './poll';
import polls from './polls';

const rootReducer = combineReducers({
	profile,
	poll,
	polls
});

export default rootReducer;
