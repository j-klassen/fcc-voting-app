'use strict';

import mongoose, { Schema } from 'mongoose';

const userSchmea = new Schema({
	github: {
		id: { type: String, required: true },
		token: { type: String, required: true },
		displayName: { type: String, required: true },
		username: { type: String, required: true }
	}
}, { timestamps: true });

export default mongoose.model('User', userSchmea);
