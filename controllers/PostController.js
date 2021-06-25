require("dotenv").config();
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/checkAuth");

router.get("/", auth, async (req, res) => {
	try {
		// const posts = await Post.find({ owner: req.user._id });
		await req.user.populate("posts").execPopulate();
		res.send(req.user.posts);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});
router.post("/", auth, async (req, res) => {
	const { title } = req.body;
	const post = new Post({
		author: req.user.firstname,
		title,
		owner: req.user._id,
	});
	try {
		await post.save();
		res.status(201).send(post);
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});
router.get("/:id", auth, async (req, res) => {
	const { id } = req.params;
	try {
		const post = await Post.findOne({ _id: id, owner: req.user._id });
		if (!post) {
			return res.status(404).send(post);
		}
		return res.send(post);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

router.patch("/:id", auth, async (req, res) => {
	console.log(req.params.id, req.user);
	const { id } = req.params;
	const { title } = req.body;
	try {
		const post = await Post.findOneAndUpdate(
			{ _id: id, owner: req.user._id },
			{ title },
			{ new: true }
		);
		if (!post) {
			return res.status(404).send();
		}
		post.save();
		res.send(post);
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});
router.delete("/:id", auth, async (req, res) => {
	const { id } = req.params;
	try {
		const post = await Post.findOneAndDelete({ _id: id, owner: req.user._id });

		if (!post) {
			return res.status(404).send({ error:'no post found'});
		}
		res.send(post);
	} catch (err) {
		res.status(404).send({ error: err.message });
	}
});
module.exports = router;
