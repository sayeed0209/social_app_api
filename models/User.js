const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const UserSchema = new Schema({
	firstname: { type: String, required: true, trim: true },
	lastname: { type: String, required: true, trim: true },
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is invalid");
			}
		},
	},
	password: { type: String, required: true, trim: true },

	tokens: [
		{
			token: { type: String, required: true },
		},
	],
});

UserSchema.methods.generateToken = async function () {
	const user = this;
	const token = jwt.sign(
		{ _id: user._id.toString() },
		process.env.ACCESS_TOKEN_SECRET
	);
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error("Unable to login");
	}
	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("Unable to login");
	}
	return user;
};
UserSchema.pre("save", async function (next) {
	const user = this;
	// to check if the password is been isModified
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 10);
	}

	next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
