const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
const AuthMiddleware = require("./middleware/checkAuth");
const PostController = require("./controllers/PostController");
const UserController = require("./controllers/UserController");

mongoose.connect("mongodb://localhost:27017/blogData", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});
app.get("/", (req, res) => {
	res.send("<h1>Welcome to home</h1>");
});
app.use("/posts", PostController);
app.use("/users", UserController);

app.listen(8000, () => {
	console.log("App runing on port 8000");
});
