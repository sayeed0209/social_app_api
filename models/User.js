const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstname: String,
	lastname: String,
	email: { type: String, required: true, unique: true },
	password: String,
});

module.exports = mongoose.model("User", UserSchema);
