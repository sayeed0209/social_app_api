const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PostController = require("./controllers/PostController");
const UserController = require("./controllers/UserController");
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

// app.get("/", (req, res) => {
// 	res.send("<h1>Welcome to home</h1>");
// });

app.use("/users", UserController);
app.use("/posts", PostController);

module.exports = app;
