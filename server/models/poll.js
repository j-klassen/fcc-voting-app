'use strict';

import mongoose, { Schema } from 'mongoose';

// Guests vote by IP, users by id
const votesSchema = new Schema({
	ip: String,
	user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// const optionsSchema = new Schema({
// 	text: { type: String, required: true },
// 	votes: { type: [votesSchema], default : [] }
// });

const pollSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	title: { type: String, required: true, trim: true },
	options: { type: [String], required: true },
	votes: { type: [votesSchema], default: [] }
}, { timestamps: true });


// Instance methods

// Hooks

pollSchema.pre('save', function (next) {
	this.options = Array.from(new Set(this.options));
	
	next();
});

const Poll = mongoose.model('Poll', pollSchema);

// Synchronous Validation

Poll.schema.path('options').validate(value => {
	return Array.from(new Set(value)).length > 0;
}, 'Poll options cannot be empty.');

export default Poll;
