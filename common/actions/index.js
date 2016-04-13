import axios from 'axios';

const ROOT_URL = 'https://localhost.daplie.com:8443/api';

// Action Types
export const FETCH_PROFILE = 'FETCH_PROFILE';
export const FETCH_POLLS = 'FETCH_POLLS';
export const FETCH_POLL = 'FETCH_POLL';

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

export function fetchProfile() {
	const request = axios.get(`${ROOT_URL}/profile`, {
		headers: {'Authorization': localStorage.getItem('token')}
	});

	return {
		type: FETCH_PROFILE,
		payload: request
	};
}
