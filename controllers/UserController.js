require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
	const user = await User.find({ email: req.body.email });
	if (!user.length) {
		res.status(401).send("user not found ");
	} else {
		if (await bcrypt.compare(req.body.password, user[0].password)) {
			// res.send("user found");
			const token = await jwt.sign(
				{
					user: user,
				},
				process.env.ACCESS_TOKEN_SECRET,
				{
					expiresIn: "1h",
				}
			);
			return res.status(200).json({
				message: "Auth sucessfull",
				token: token,
			});
		} else {
			res.status(401).send("user not found ");
		}
	}
});
module.exports = router;
