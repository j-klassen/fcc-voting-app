import expect from 'expect';
import mongoose from 'mongoose';
import Poll from '../../server/models/poll';

const ObjectId = mongoose.Types.ObjectId;

describe('Poll Model', () => {
	after(async function (done) {
		try {
			await Poll.remove({});
			
			done();
		} catch (error) {
			done(error);
		}
	});

	it('should prune duplicate voting options on save', async function (done) {
		try {
			let poll = new Poll({
				user: ObjectId(),
				title: 'Poll #1',
				options: ['one', 'two', 'one']
			});
			
			await poll.save();
			expect(poll.options).toEqual(['one', 'two']);
			
			poll.options.push('three', 'three');
			
			await poll.save();
			expect(poll.options).toEqual(['one', 'two', 'three']);
			
			done();
		} catch (error) {
			done(error);
		}
	});
});