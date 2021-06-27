require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/checkAuth");
// const sharp = require("sharp");
const multer = require("multer");
const upload = multer({
	limits: {
		fileSize: 2000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|png|PNG|gif|jpeg)$/)) {
			return cb(
				new Error('Please upload a file with "png, jpg,gif or jpeg extensions"')
			);
		}
		cb(undefined, true);
	},
});
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
		updates.forEach(update => (req.user[update] = req.body[update]));
		await req.user.save();
		res.send(req.user);
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

router.post(
	"/me/avatar",
	auth,
	upload.single("avatar"),
	async (req, res) => {
		// const avatarBuffer = await sharp(req.file.buffer).resize({width: 300, height:300}).png().toBuffer()
		// req.user.avatar = avatarBuffer
		req.user.avatar = req.file.buffer;
		await req.user.save();
		res.send();
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);
router.delete(
	"/me/avatar",
	auth,
	upload.single("avatar"),
	async (req, res) => {
		req.user.avatar = undefined;
		await req.user.save();
		res.send();
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);
router.get("/:id/avatar", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user || !user.avatar) {
			throw new Error();
		}
		res.set("Content-Type", "image/jpg");
		res.send(user.avatar);
	} catch (err) {
		res.status(404).send({ error: err.message });
	}
});
module.exports = router;
