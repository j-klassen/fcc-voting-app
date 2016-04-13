import { FETCH_POLLS } from '../actions';

const polls = (state = [], action) => {
	switch (action.type) {
		case FETCH_POLLS:
			return action.payload.data.payload;

		default:
			return state;
	}
};

export default polls;
