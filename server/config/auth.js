export default {
	twitter: {
		consumerKey: process.env.TWITTER_CONSUMER_KEY,
		consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
		callbackURL: `https://localhost.daplie.com:${process.env.PORT}/auth/twitter/callback`
	},

	github: {
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		callbackURL: `https://localhost.daplie.com:${process.env.PORT}/auth/github/callback`
	}
};
