import { FETCH_PROFILE } from '../actions';

const profile = (state = {}, action) => {
	switch (action.type) {
		case FETCH_PROFILE:
			return action.payload.data.payload;

		default:
			return state;
	}
};

export default profile;
