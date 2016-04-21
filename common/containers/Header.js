import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired
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
		if (this.props.auth.isAuthenticated) {
			return this.props.auth.user.github.displayName;
		} else {
			return '';
		}
	}

	renderNav() {
		const { auth } = this.props;

		if (auth.isAuthenticated) {
			return (
				<ul className="nav navbar-nav navbar-right">
					<li><Link to="/polls/mine">My Polls</Link></li>
					<li><Link to="/polls/new">New Poll</Link></li>
					<li className="dropdown">
						<a href="#" className="dropdown-toggle" data-toggle="dropdown"
							role="button" aria-haspopup="true"
							aria-expanded="false">{ auth.user.github.displayName } <span className="caret"></span></a>
						<ul className="dropdown-menu">
							<li><Link to="logout">Logout</Link></li>
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
	return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
