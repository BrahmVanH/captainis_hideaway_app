const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 50,
		},
		lastName: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 50,
		},
		username: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 50,
		},
		password: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 50,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// This is hashing through the password with bcrypt - 10 times
userSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
