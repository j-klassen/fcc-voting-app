import '../common/styles/loader.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from '../common/store/configureStore';
import routes from '../common/routes';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('app');

render(
	<Provider store={store}>
		{/* Replaces our <App /> instance. */}
		<Router history={ browserHistory } routes={ routes } />
	</Provider>,
	rootElement
);
