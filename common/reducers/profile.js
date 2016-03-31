import { FETCH_PROFILE } from '../actions';

const profile = (state = {}, action) => {
	switch (action.type) {
		case FETCH_PROFILE:
			return action.payload.data;

		default:
			return state;
	}
};

export default profile;
