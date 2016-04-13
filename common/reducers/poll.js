import { FETCH_POLL } from '../actions';

const poll = (state = {}, action) => {
	switch (action.type) {
		case FETCH_POLL:
			return action.payload.data.payload;

		default:
			return state;
	}
};

export default poll;
