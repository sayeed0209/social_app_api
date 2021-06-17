const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
	author: String,
	title: { type: String, trim: true },
});

module.exports = mongoose.model("Post", PostSchema);
