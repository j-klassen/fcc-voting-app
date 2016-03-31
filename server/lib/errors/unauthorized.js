import APIError from './apiError';
import { Authorization } from './errorCodes';

export default class Unauthorized extends APIError {
	static Messages = {
		[Authorization.AUTHORIZATION_HEADER]: 'Invalid or missing token.',
		[Authorization.TOKEN_EXPIRED]: 'Token has expired.'
	}

	constructor(code = Authorization.AUTHORIZATION_HEADER	) {
		super(code, Unauthorized.Messages[code]);
	}
}
