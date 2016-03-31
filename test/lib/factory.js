import FactoryGirl from 'factory-girl';
import bluebird from 'bluebird';
import User from '../../server/models/user';
import Poll from '../../server/models/poll';

const factory = new FactoryGirl.Factory().promisify(bluebird);

factory.define('User', User, {
	github: factory.sequence((n) => {
		return {
			id: `user${n}@test.com`,
			token: `token${n}`,
			displayName: `displayName${n}`,
			username: `username${n}`
		};
	})
});

factory.define('Poll', Poll, {
	user: factory.assoc('User', 'id'),
	title: factory.sequence(n => `Poll #${n}`),
	options: ['one', 'two']
});

export default factory;