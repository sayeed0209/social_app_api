require("dotenv").config();
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const AuthMiddleware = require("../middleware/checkAuth");

router.get("/", async (req, res, next) => {
	const posts = await Post.find({});
	res.render("posts/index", { posts });
});
router.get("/new", async (req, res) => {
	res.render("posts/newPost");
});
router.post("/", async (req, res) => {
	const { author, title } = req.body;
	const post = new Post({ author, title });
	await post.save();
	res.redirect("/posts");
	console.log(author, title);
});
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const post = await Post.findById({ _id: id });
	res.render("posts/show", { post });
});
router.get("/:id/edit", async (req, res) => {
	const { id } = req.params;
	const post = await Post.findById({ _id: id });
	res.render("posts/edit", { post });
});
router.patch("/:id", async (req, res) => {
	const { id } = req.params;
	const { title } = req.body;
	const post = await Post.findByIdAndUpdate(id, { title }, { new: true });
	res.redirect("/posts");
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
