import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/App';
import UsersIndex from '../containers/UsersIndex';
import UserShow from '../containers/UserShow';

export default (
	<Route path="/(:token)" component={ App }>
		<IndexRoute component={ UsersIndex } />
		<Route path="/users/:id" component={ UserShow } />
	</Route>
);
