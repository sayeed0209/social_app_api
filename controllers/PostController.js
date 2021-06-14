const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res, next) => {
	const posts = await Post.find({});
	res.send(posts);
});
router.post("/create", async (req, res, next) => {
	const { author, title } = req.body;
	const post = new Post({ author, title });
	await post.save();
	res.send("Post created");
});

module.exports = router;
