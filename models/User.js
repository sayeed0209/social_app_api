const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: { type: String, required: true, unique: true },
	password: String,
});

module.exports = mongoose.model("User", UserSchema);
