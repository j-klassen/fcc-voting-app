import axios from 'axios';

export const AUTH_URL = 'https://localhost.daplie.com:8443/auth';
export const ROOT_URL = 'https://localhost.daplie.com:8443/api';

// Action Types
export const FETCH_POLLS = 'FETCH_POLLS';
export const FETCH_POLL = 'FETCH_POLL';
export const CREATE_POLL = 'CREATE_POLL';
export const LOGOUT = 'LOGOUT';

export function fetchPolls() {
	const request = axios.get(`${ROOT_URL}/polls`);

	return {
		type: FETCH_POLLS,
		payload: request
	};
}

export function fetchPoll(id) {
	const request = axios.get(`${ROOT_URL}/polls/${id}`);

	return {
		type: FETCH_POLL,
		payload: request
	};
}

export function logout() {
	const request = axios.post(`${AUTH_URL}/logout`);
	
	return {
		type: LOGOUT,
		payload: request
	};
}