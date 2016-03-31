import mongoose from 'mongoose';
import debug from 'debug';
const log = debug('database');

// Database connection

export default (() => {
	// Connect only once
	if (mongoose.connection.readyState === 1) {
		return mongoose.connection;
	}

	// Otherwise, init connection
	const host = process.env.MONGO_URI;
	let db;

	if (process.env.NODE_ENV === 'test') {
		db = process.env.MONGO_TEST_DB;
	} else {
		db = process.env.MONGO_DB;
	}

	const connectionString = `${host}${db}`;

	mongoose.connect(connectionString);
	mongoose.connection.once('open', () => {
		log(`Database connection open @ ${connectionString}`);
	});

	return mongoose.connection;
})();
