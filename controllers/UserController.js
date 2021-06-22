require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
router.post("/create", async (req, res) => {
	try {
		const { firstname, lastname, email, password } = req.body;
		const user = new User({ firstname, lastname, email, password });
		await user.save();
		const token = await user.generateToken();
		res.status(201).send({ user, token });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});

router.patch("/:id", async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["firstname", "lastname", "email", "password"];
	const isValidoperation = updates.every(update =>
		allowedUpdates.includes(update)
	);
	if (!isValidoperation) {
		return res.status(400).send({ error: "Invalid Updates" });
	}
	try {
		const user = await User.findById(req.params.id);
		updates.forEach(key => (user[key] = req.body[key]));
		// const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		// 	new: true,
		// 	runValidators: true,
		// });
		await user.save();
		if (!user) {
			return res.status(404).send();
		}

		res.send(user);
	} catch (err) {
		res.status(400).send(err);
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateToken();

		res.send({ user, token });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});

module.exports = router;
