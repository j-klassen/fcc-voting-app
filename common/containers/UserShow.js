import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

class UserShow extends Component {
	static propTypes = {
		user: PropTypes.object.isRequired,
		params: PropTypes.object.isRequired,
		fetchUser: PropTypes.func.isRequired
	}

	// Get data on first render
	componentWillMount() {
		this.props.fetchUser(this.props.params.id);
	}

	render() {
		const { user } = this.props;

		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						Show user { user.username }
					</div>

					<div className="col-xs-12">
						<button type="submit" value="vote" onClick={ this.handleVote.bind(this) }
							className="btn btn-primary">Vote</button>
						<button type="submit" value="delete" onClick={ this.handleDelete.bind(this) }
							className="btn btn-danger">Delete</button>
					</div>
				</div>
			</div>
		);
	}

	handleVote(event) {
		event.preventDefault();
	}

	handleDelete(event) {
		event.preventDefault();
	}
}

function mapStateToProps(state) {
	return { user: state.user };
}

export default connect(mapStateToProps, { fetchUser })(UserShow);
