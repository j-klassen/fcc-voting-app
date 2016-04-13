import passport from 'passport';
import APIResponse from '../lib/apiResponse';
import Unauthorized from '../lib/errors/unauthorized';
import Poll from '../models/poll';
import { tokenForUser } from '../lib/jwt';

const requireJWT = (req, res, next) => {
	passport.authenticate('jwt', { session: false }, (err, user) => {	
		console.log(err, user);
		
		if (err) return next(err);
		// User does not exist
		if (!user) return next(new APIResponse(401, new Unauthorized()));
		
		req.user = user;
		
		next();
	})(req, res, next);
};


function app(router, passport) {
	// Github

	// Send to Github for auth
	router.get('/auth/github', passport.authenticate('github', {
		session: false,
		scope : 'user:email'
	}));

	const handleGithubCallback = passport.authenticate('github', {
		session: false,
		failureRedirect: '/'
	});

	// Handle callback after Github has authenticated the user.
	router.get('/auth/github/callback', handleGithubCallback, (req, res) => {
		// Redirect and attach token to URL
		// res.redirect(`/?token=${tokenForUser(req.user)}`);
		res.cookie('token', tokenForUser(req.user), { secure: true });
		res.redirect('/');
	});

	// Unlinking account
	router.get('/unlink/github', requireJWT, (req, res, next) => {
		let user = req.user;
		user.github.token = undefined;

		user.save((err) => {
			if (err) {
				console.error(err);
				return next(err);
			}

			res.end();
		});
	});
}

function api(router) {
	router.get('/polls', (req, res) => {
		Poll.find({}, {}, { sort: { 'created': -1 } }, (err, polls) => {
			res.json(new APIResponse(200, err, polls));
		});
	});
	
	router.get('/polls/mine', requireJWT, (req, res, next) => {
		Poll.find({ user: req.user.id }, {}, { sort: { 'created': -1 } }, (err, polls) => {
			if (err) return next(err);

			res.json(new APIResponse(200, null, polls));
		});
	});

	router.get('/polls/:id', (req, res, next) => {
		Poll.findById(req.params.id, (err, poll) => {
			if (err) {
				return next(err);
			}

			res.json(new APIResponse(200, err, poll));
		});
	});

	router.delete('/polls/:id', requireJWT, (req, res, next) => {
		Poll.findByIdAndRemove(req.params.id, err => {
			if (err) {
				return next(err);
			}

			res.json(new APIResponse(200, err));
		});
	});

	router.post('/polls', requireJWT, (req, res, next) => {
		let poll = new Poll();

		poll.title = req.body.title;
		req.body.options.map(text => poll.addOption(text));

		poll.save(err => {
			if (err) {
				return next(err);
			}

			res.json({ poll });
		});
	});

	router.get('/profile', requireJWT, (req, res) => {
		res.json(new APIResponse(200, null, JSON.parse(JSON.stringify(req.user))));
	});
}

function isLoggedIn(req, res, next) {
	console.log(req.isAuthenticated());
	if (req.isAuthenticated()) {
		return next();
	}

	next(new APIResponse(401, new Unauthorized()));
}

export default {
	app,
	api
};
