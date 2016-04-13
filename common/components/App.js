import React from 'react';
import { Component } from 'react';
import cookie from 'react-cookie';

import Header from '../containers/Header';

export default class App extends Component {
	static propTypes = {
		children: React.PropTypes.node
	}

	componentDidMount() {
		// console.log(cookie.load('token'));
		localStorage.setItem('token', cookie.load('token'));
	}

	render() {
		return (
			<div>
				<Header logout={this.logout} />
				<section className="content">
					{ this.props.children }
				</section>
			</div>
		);
	}
	
	logout() {
		localStorage.clear();
	}
}
