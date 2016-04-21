import { LOGOUT } from '../actions';

let initialState = {
	user: null,
	isAuthenticated: false
};

const auth = (state = initialState, action) => {
	switch (action.type) {
		case LOGOUT:
			return {
				...state,
				user: null,
				isAuthenticated: false
			};

		default:
			return state;
	}
};

export default auth;
