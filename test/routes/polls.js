import expect from 'expect';
import request from 'supertest';
import app from '../../server';
import { tokenForUser } from '../../server/lib/jwt';
import User from '../../server/models/user';
import Poll from '../../server/models/poll';
import factory from '../lib/factory';

describe('Polls API', () => {
	let poll;

	before(async function (done) {
		try {
			// Create a poll, which also creates an associated user.
			poll = await factory.create('Poll');

			done();
		} catch (err) {
			done(err);
		}
	});

	after(async function (done) {
		try {
			await Poll.remove({});
			await User.remove({});

			done();
		} catch (err) {
			done(err);
		}
	});

	describe('guests', () => {
		it('can fetch a list of polls', (done) => {
			request(app)
			.get('/api/polls')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(res.body.error).toBe(null);
				expect(res.body.status).toEqual(200);
				expect(res.body.payload.length).toEqual(1);
				
				done(err);
			});
		});
		
		it('can fetch an individual poll', (done) => {
			request(app)
			.get(`/api/polls/${poll.id}`)
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(res.body.error).toBe(null);
				expect(res.body.status).toEqual(200);
				expect(res.body.payload._id).toEqual(poll.id);
				
				done(err);
			});
		});
		
		it('cannot get my own polls', (done) => {
			request(app)
			.get('/api/polls/mine')
			.expect('Content-Type', /json/)
			.expect(401)
			.end((err, res) => {
				expect(res.body.error).toExist();
				expect(res.body.status).toEqual(401);
				expect(res.body.payload).toEqual({});
				
				done(err);
			});
		});
	});

	describe('members only', () => {
		let token;
		let poll;

		before(async function (done) {
			try {
				poll = await factory.create('Poll');
				token = tokenForUser({ id: poll.user });

				done();
			} catch (err) {
				done(err);
			}
		});

		after(async function (done) {
			try {
				await Poll.remove({});
				await User.remove({});

				done();
			} catch (err) {
				done(err);
			}
		});
		
		it('can get my own polls', (done) => {
			request(app)
			.get('/api/polls/mine')
			.set('Authorization', token)
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(res.body.error).toBe(null);
				expect(res.body.status).toEqual(200);
				expect(res.body.payload).toBeA('array');
				expect(res.body.payload.length).toEqual(1);
				
				done(err);
			});
		});
	});
});
