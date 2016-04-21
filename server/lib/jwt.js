import jwt from 'jwt-simple';
import moment from 'moment';

export function tokenForUser(user) {
	// `sub` short for `subject`
	// `iat` short for `issued at time`
	return jwt.encode({
		sub: user,
		iat: moment.utc().valueOf(),
		exp: moment.utc().add(20, 'minutes').valueOf()
	}, process.env.JWT_SECRET);
}
