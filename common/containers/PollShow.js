import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPoll } from '../actions';

class PollShow extends Component {
	static propTypes = {
		poll: PropTypes.object.isRequired,
		params: PropTypes.object.isRequired,
		fetchPoll: PropTypes.func.isRequired
	}

	// Get data on first render
	componentWillMount() {
		this.props.fetchPoll(this.props.params.id);
	}

	render() {
		const { poll } = this.props;

		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						Show user { poll.title }
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
	return { poll: state.poll };
}

export default connect(mapStateToProps, { fetchPoll })(PollShow);
