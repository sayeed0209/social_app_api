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
});
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const post = await Post.findById({ _id: id });
	res.status(404).send(post);
});
router.get("/:id/edit", async (req, res) => {
	const { id } = req.params;
	const post = await Post.findById({ _id: id });
});
router.patch("/:id", async (req, res) => {
	const { id } = req.params;
	const { title } = req.body;
	const post = await Post.findByIdAndUpdate(id, { title }, { new: true });
	res.status(404).send(post);
});
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const post = await Post.findByIdAndDelete(id);
	res.status(404).send(post);
});
module.exports = router;
