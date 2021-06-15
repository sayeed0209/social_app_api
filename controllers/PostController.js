const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const AuthMiddleware = require("../middleware/checkAuth");

router.get("/", async (req, res, next) => {
	const posts = await Post.find({});
	res.send(posts);
});
router.post("/create", AuthMiddleware, async (req, res, next) => {
	console.log(req.body);

	const post = new Post(req.body);
	await post.save();
	res.send("Post created");
});
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const post = await Post.findById({ _id: id });
	if (post) {
		res.status(200).json({
			message: "Post found",
			post: post,
		});
	} else {
		res.status(401).json({
			message: "Post now found with given id",
		});
	}
});

router.patch("/:id", async (req, res) => {
	const { id } = req.params;
	const { title } = req.body;
	console.log(id);
	const post = await Post.findByIdAndUpdate(id, { title }, { new: true });
	if (post) {
		res.status(200).json({
			message: "Post has been updated sucessfully",
			post: post,
		});
	} else {
		res.status(401).json({
			message: "Post now found with given id",
		});
	}
	post.save();
});
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const post = await Post.findByIdAndDelete(id);
	if (post) {
		res.status(200).json({
			message: "Post has been Deleted",
		});
	} else {
		res.status(401).json({
			message: "Post now found with given id",
		});
	}
});
module.exports = router;
