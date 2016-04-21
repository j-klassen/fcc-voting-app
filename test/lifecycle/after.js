// Perform tasks after all tests

import dbConnection from '../../server/resources/database';

after(function (done) {
	try {
		dbConnection.db.dropDatabase();
		dbConnection.close();

		done();
	} catch (err) {
		done(err);
	}
});
