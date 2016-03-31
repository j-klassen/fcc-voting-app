import { Error as MongooseError } from 'mongoose';
import debug from 'debug';
import ErrorCodes from '../lib/errors/errorCodes';
import ApiResponse from '../lib/apiResponse';
import BadRequest from '../lib/errors/badRequest';

const log = debug('app:error');

/* eslint-disable no-unused-vars */
export default function errorHandler(apiResponse, req, res, next) {
	log(apiResponse);

	if (apiResponse instanceof ApiResponse) {
		res.status(apiResponse.status || 500).json(apiResponse);
	} else if (apiResponse instanceof MongooseError.CastError) {
		res.status(400).json(new ApiResponse(
			400,
			new BadRequest(ErrorCodes.BadRequest.INVALID_ID)
		));
	}
}
/* eslint-enable no-unused-vars */