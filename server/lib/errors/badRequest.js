import APIError from './apiError';
import Errors from './errorCodes';

export default class BadRequest extends APIError {
	static Messages = {
		[Errors.BadRequest.INVALID_ID]: 'Invalid object id, cannot complete request'
	}

	constructor(code) {
		super(code, BadRequest.Messages[code]);
	}
}
