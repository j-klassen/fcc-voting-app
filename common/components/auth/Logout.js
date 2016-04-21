import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import { browserHistory } from 'react-router';

class Logout extends Component {
	static propTypes = {
		logout: PropTypes.func.isRequired
	}

	componentWillMount() {
		this.props.logout()
		.then(() => {
			browserHistory.push('/');
		})
		.catch((err) => {
			console.error(err);
		});
	}
	
	render() {
		return null;
	}
}

export default connect(null, { logout })(Logout);