import APIError from './errors/apiError';

export default class APIResponse {
	/**
	 * APIResponse object
	 * @param  {number} status   - HTTP status
	 * @param  {APIError} error  - APIError object
	 * @param  {object} payload  - JSON data
	 */
	constructor(status, error = null, payload = {}) {
		if (!status) {
			throw new Error('A valid http status must be provided');
		}

		if (error && !(error instanceof APIError)) {
			throw new Error('Provide a valid APIError based object.');
		}

		this.status = status;
		this.error = error;
		this.payload = payload;
	}
}
