const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cokkieParser = require("cookie-parser");
const methodOverride = require("method-override");
const jwt = require("jsonwebtoken");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cokkieParser());
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

// const myFunc = async () => {
// 	const token = jwt.sign({ _id: "123abc" }, process.env.ACCESS_TOKEN_SECRET, {
// 		expiresIn: "1h",
// 	});
// 	console.log(token);
// 	const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
// 	console.log(verifyToken);
// };

// myFunc();
