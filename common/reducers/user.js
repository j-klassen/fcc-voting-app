import { FETCH_USER } from '../actions';

const user = (state = {}, action) => {
	switch (action.type) {
		case FETCH_USER:
			return action.payload.data;

		default:
			return state;
	}
};

export default user;
