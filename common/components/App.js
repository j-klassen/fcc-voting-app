import React from 'react';
import { Component } from 'react';

import Header from '../containers/Header';

export default class App extends Component {
	static propTypes = {
		children: React.PropTypes.node
	}

	render() {
		return (
			<div>
				<Header />
				<section className="content">
					{ this.props.children }
				</section>
			</div>
		);
	}
}
