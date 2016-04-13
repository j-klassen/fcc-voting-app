import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchProfile } from '../actions';

class PollsIndex extends Component {
	static propTypes = {
		profile: React.PropTypes.object.isRequired,
		fetchProfile: React.PropTypes.func.isRequired,
		logout: React.PropTypes.func.isRequired
	}

	// Get data on first render
	componentDidMount() {
		this.props.fetchProfile();
	}

	render() {
		return (
			<div className="container-fluid navbar navbar-default">
				<div className="container">
					<nav>
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed"
											data-toggle="collapse" data-target="#header-menu"
											aria-expanded="false">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<Link to="/" className="navbar-brand">FCC Polls</Link>
						</div>

						<div className="collapse navbar-collapse" id="header-menu">
							{ this.renderNav() }
						</div>
					</nav>
				</div>
			</div>
		);
	}

	renderDisplayName() {
		if (this.props.profile.github) {
			return this.props.profile.github.displayName;
		} else {
			return '';
		}
	}

	renderNav() {
		const profile = this.props.profile;

		if (profile.github) {
			return (
				<ul className="nav navbar-nav navbar-right">
					<li><Link to="/polls/mine">My Polls</Link></li>
					<li><Link to="/polls/new">New Poll</Link></li>
					<li className="dropdown">
						<a href="#" className="dropdown-toggle" data-toggle="dropdown"
							role="button" aria-haspopup="true"
							aria-expanded="false">{ profile.github.displayName } <span className="caret"></span></a>
						<ul className="dropdown-menu">
							<li onClick={this.props.logout()}><a href="/logout">Logout</a></li>
						</ul>
					</li>
				</ul>
			);
		} else {
			return (
				<ul className="nav navbar-nav navbar-right">
					<li><a href="/auth/github">Github Signin</a></li>
				</ul>
			);
		}
	}
}

function mapStateToProps(state) {
	return { profile: state.profile };
}

export default connect(mapStateToProps, { fetchProfile })(PollsIndex);
