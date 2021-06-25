const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema(
	{
		author: { type: String, trim: true },
		title: { type: String, trim: true },
		owner: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
