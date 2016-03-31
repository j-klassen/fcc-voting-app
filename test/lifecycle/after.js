// Perform tasks after all tests

import dbConnection from '../../server/resources/database';

after(function (done) {
	try {
		dbConnection.close();

		done();
	} catch (err) {
		done(err);
	}
});
