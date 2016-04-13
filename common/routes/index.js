import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/App';
import PollsIndex from '../containers/PollsIndex';
import PollShow from '../containers/PollShow';

export default (
	<Route path="/(:token)" component={ App }>
		<IndexRoute component={ PollsIndex } />
		<Route path="/polls/:id" component={ PollShow } />
	</Route>
);
