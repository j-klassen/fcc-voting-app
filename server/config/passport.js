import { Strategy as GithubStrategy } from 'passport-github';
import { Strategy as JwtStrategy } from 'passport-jwt';
import User from '../models/user';
import Auth from './auth';
import APIResponse from '../lib/apiResponse';
import Unauthorized from '../lib/errors/unauthorized';
import ErrorCodes from '../lib/errors/errorCodes';

export default function(passport) {
	// ===========================
	// JWT
	// ===========================
	
	// Cookie extractor
	const cookieExtractor = (req) => {
		let token = null;
		if (req && req.cookies) {
			token = req.cookies['token'];
		}
		
		return token;
	};

	const jwtOptions = {
		jwtFromRequest: cookieExtractor,
		secretOrKey: process.env.JWT_SECRET
	};

	passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
		// `payload` is decoded jwt
		// Make sure the user id is in the database
		// At this point, `payload.sub` is a POJO so the mongoose .id accessor won't
		// work as expected.
		User.findById(payload.sub._id, (err, user) => {
			if (err) return done(err);
			// No err but user doesn't exist
			if (!user) return done(null, false);

			// Check jwt expiry
			if (Date.now() > payload.exp) {
				const error = new Unauthorized(ErrorCodes.Authorization.TOKEN_EXPIRED);
				return done(new APIResponse(401, error));
			}

			done(null, user);
		});
	}));

	// ===========================
	// Github
	// ===========================

	passport.use(new GithubStrategy({
		clientID: Auth.github.clientID,
		clientSecret: Auth.github.clientSecret,
		callbackURL: Auth.github.callbackURL,
		// Allows us to pass in the req from our route (lets us check if a user is logged in or not)
		passReqToCallback: true
	}, (req, token, tokenSecret, profile, done) => {
		process.nextTick(() => {
			if (!req.user) {
				User.findOne({ 'github.id': profile.id }, (err, user) => {
					if (err) {
						return done(err);
					}

					if (user) {
						// If there is a user id already but no token - user was linked at
						// one point and then removed
						if (!user.github.token) {
							user.github.token = token;
							user.github.username = profile.username;
							user.github.displayName = profile.displayName;

							user.save((err) => {
								if (err) {
									return done(err);
								}

								return done(null, user);
							});
						}

						return done(null, user); // user found, return that user
					} else {
						// New user
						let newUser = new User();
						newUser.github.id = profile.id;
						newUser.github.token = token;
						newUser.github.username = profile.username;
						newUser.github.displayName = profile.displayName;

						newUser.save(function(err) {
							if (err) {
								return done(err);
							}

							return done(null, newUser);
						});
					}
				});
			} else {
				// User already exists and is logged in, link accounts.
				let user = req.user;
				user.github.id = profile.id;
				user.github.token = token;
				user.github.username = profile.username;
				user.github.displayName = profile.displayName;

				user.save((err) => {
					if (err) {
						return done(err);
					}

					return done(null, user);
				});
			}
		});
	}));
}
