require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res, next) => {
	// register user
	const { firstName, lastName, email, password } = req.body;
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);
	const user = new User({ firstName, lastName, email, password: hashPassword });
	console.log(user);
	await user.save();
	res.send("User created");
});

router.get("/login", async (req, res, next) => {
	const user = await User.find({});
	res.json({ user: user });
});
module.exports = router;
