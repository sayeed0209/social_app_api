require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middleware/checkAuth");

router.post("/create", async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (e) {
		res.status(400).send();
	}
});

router.post("/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(token => {
			return token.token !== req.token;
		});
		await req.user.save();

		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

router.post("/logoutAll", auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

router.get("/me", auth, async (req, res) => {
	// console.log(req.user);
	res.send(req.user);
});

router.patch("/me", auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["firstname", "lastname", "email", "password"];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates!" });
	}

	try {
		const user = await User.findById(req.user._id);

		updates.forEach(update => (user[update] = req.body[update]));
		await user.save();

		if (!user) {
			return res.status(404).send();
		}

		res.send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete("/me", auth, async (req, res) => {
	try {
		// const user = await User.findByIdAndDelete(req.user._id);
		// if (!user) {
		// 	return res.status(404).send();
		// }
		await req.user.remove();
		res.send(req.user);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
