import path from 'path';
import https from 'https';
import daplie from 'localhost.daplie.com-certificates';
import express from 'express';
import morgan from 'morgan';
import { default as bodyParser } from 'body-parser';
import { Types } from 'mongoose';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import passport from 'passport';
import configPassport from './config/passport';
import routes from './routes';
import errorHandler from './middleware/error';

// Server side rendering imports
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import configureStore from '../common/store/configureStore';
import { default as reactRoutes } from '../common/routes';

// Database
import './resources/database';

configPassport(passport);

const ObjectId = Types.ObjectId;
const webpackConfig = require(path.join(__dirname, '../webpack.config'));
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const app = express();
const compiler = webpack(webpackConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Webpack middleware has a heavy init time. Disable for tests.
if (env === 'development') {
	app.use(webpackDevMiddleware(compiler, {
		hot: true,
		noInfo: true,
		quiet: false,
		watchOptions: {
			// Important when useing Vagrant for HMR
			poll: true
		},
		publicPath: webpackConfig.output.publicPath,
		stats: {
			colors: true
		},
		historyApiFallback: true
	}));

	app.use(webpackHotMiddleware(compiler, {
		log: console.log,
		reload: true
	}));
}

app.use(morgan('dev'));

const api = express.Router();

routes.app(app, passport);
routes.api(api);

app.use('/api', api);

// This is fired every time the server side receives a request
app.use(handleRender);

// Error middleware
app.use(errorHandler);

function handleRender(req, res) {
	match({ routes: reactRoutes, location: req.url }, (err, redirectLocation, renderProps) => {
		if (err) {
			res.status(500).send(err.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			// Compile an initial state
			const initialState = { };

			// Create a new Redux store instance
			const store = configureStore(initialState);

			// Render the component to a string
			const html = renderToString(
				<Provider store={store}>
					{ <RouterContext {...renderProps} /> }
				</Provider>
			);

			// Grab the initial state from our Redux store
			const finalState = store.getState();

			// Send the rendered page back to the client
			res.send(renderFullPage(html, finalState));
		} else {
			res.status(404).send('Not found');
		}
	});
}

function renderFullPage(html, initialState) {
	return `
		<!doctype html>
		<html>
			<head>
				<title>Redux Universal Example</title>

				<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
					integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7"
					crossorigin="anonymous">
				<link rel="stylesheet" href="https://cdn.rawgit.com/thomaspark/bootswatch/gh-pages/paper/bootstrap.min.css">
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
				<link rel="stylesheet" href="https://rawgit.com/ConnorAtherton/loaders.css/master/loaders.min.css">
			</head>
			<body>
				<div id="app">${html}</div>
				<script>
					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
				</script>

				<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.2.0/js/tether.min.js"></script>
				<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
					integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS"
					crossorigin="anonymous"></script>
				<script src="/static/bundle.js"></script>
			</body>
		</html>
		`;
}

const server = https.createServer(daplie, app);

if (!module.parent) {
	server.listen(port, (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log(`==> 🌎 listening on ${port}. Open up https://localhost.daplie.com:${port} in your browser.`);
		}
	});
}

export default app;
