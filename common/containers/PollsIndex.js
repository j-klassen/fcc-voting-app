import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchPolls } from '../actions';

class PollsIndex extends Component {
	static propTypes = {
		polls: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
		fetchPolls: React.PropTypes.func.isRequired,
		fetching: React.PropTypes.bool.isRequired
	}

	// Could be called for SSR?
	static fetchData({ store }) {
		return store.dispatch(fetchPolls());
	}

	// Get data on first render
	// Note: `componentWillMount` is called server side AND client side
	componentWillMount() {
		this.setState({ fetching: true });

		this.props.fetchPolls()
		.then(() => {
			this.setState({ fetching: false });
		});
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<div className="jumbotron text-center">
							<h1>Polls</h1>
							<h4><em>Signup</em> and create your own polls!</h4>
							<hr />
							<h3>Latest</h3>
							<div className="list-group">
								{ this.renderPolls() }
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderPolls() {
		if (this.state.fetching && this.props.polls.length === 0) {
			return (
				<div className="loader-inner ball-pulse">
					<div></div>
					<div></div>
					<div></div>
				</div>
			);
		} else if (this.state.fetching === false && this.props.polls.length === 0) {
			return <div>There are currently no polls...</div>;
		}

		return this.props.polls.map((poll) => {
			return (
				<Link to={ `/polls/${poll._id}` } poll={ poll } className="list-group-item" key={ poll._id }>{ poll.title }</Link>
			);
		});
	}
}

function mapStateToProps(state) {
	return { polls: state.polls, fetching: false };
}

export default connect(mapStateToProps, { fetchPolls })(PollsIndex);
