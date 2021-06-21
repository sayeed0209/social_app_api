require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
function generateAccessToken(email) {
	return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1800s",
	});
}
router.get("/register", (req, res) => {
	res.render("users/index");
});
router.post("/register", async (req, res, next) => {
	// register user
	const { firstname, lastname, email, password } = req.body;
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);
	const user = new User({ firstname, lastname, email, password: hashPassword });
	await user.save();
	res.redirect("/posts");
});

router.get("/login", async (req, res, next) => {
	// const users = await User.find({});
	res.render("users/login");
});
router.post("/login", async (req, res, next) => {
	const user = await User.find({ email: req.body.email });
	console.log(user);
	if (await bcrypt.compare(req.body.password, user[0].password)) {
		const token = generateAccessToken({ email: req.body.email });
		return res.json({ status: "ok", data: token });
	}
	res.redirect("/posts");

	// const token = await jwt.sign(
	// 	{ user: user },
	// 	process.env.ACCESS_TOKEN_SECRET,
	// 	{ expiresIn: "1h" }
	// );
	// res.send(token);
});
module.exports = router;
