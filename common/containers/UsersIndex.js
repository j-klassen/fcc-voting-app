import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersIndex extends Component {
	static propTypes = {
		users: React.PropTypes.arrayOf(React.PropTypes.object),
		fetchUsers: React.PropTypes.func
	}

	static fetchData({ store }) {
		return store.dispatch(fetchUsers());
	}

	// Get data on first render
	componentDidMount() {
		this.props.fetchUsers();
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<div className="jumbotron text-center">
							<h1>Users</h1>
							<h4><em>Signup</em> and join the user list today!</h4>
							<hr />
							<h3>Latest</h3>
							<div className="list-group">
								{ this.renderUsers() }
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderUsers() {
		if (this.props.users.length === 0) {
			return (
				<div className="loader-inner ball-pulse">
					<div></div>
					<div></div>
					<div></div>
				</div>
			);
		}

		return this.props.users.map((user) => {
			return (
				<Link to={ `/users/${user._id}` } user={ user } className="list-group-item" key={ user._id }>{ user.username }</Link>
			);
		});
	}
}

function mapStateToProps(state) {
	return { users: state.users };
}

export default connect(mapStateToProps, { fetchUsers })(UsersIndex);
