import axios from 'axios';

const ROOT_URL = 'https://localhost.daplie.com:8443/api';

// Action Types
export const SIGNUP = 'SIGNUP';
export const FETCH_PROFILE = 'FETCH_PROFILE';
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USER = 'FETCH_USER';

export function signup(formData) {
	const request = axios.post(`${ROOT_URL}/signup`, formData);

	return {
		type: SIGNUP,
		payload: request
	};
}

export function fetchUsers() {
	const request = axios.get(`${ROOT_URL}/users`);

	return {
		type: FETCH_USERS,
		payload: request
	};
}

export function fetchUser(id) {
	const request = axios.get(`${ROOT_URL}/users/${id}`);

	return {
		type: FETCH_USER,
		payload: request
	};
}

export function fetchProfile() {
	const request = axios.get(`${ROOT_URL}/profile`);

	return {
		type: FETCH_PROFILE,
		payload: request
	};
}
