const { Schema, model } = require('mongoose');

const dateSchema = new Schema({
	propertyName: {
		type: String,
		required: true,
		enum: ['captainsHideaway', 'captainsCottage'],
	},
	dateValue: {
		type: String,
		required: true,
	},
});

const UnavailableDate = model('UnavailableDate', dateSchema);

module.exports = UnavailableDate;
