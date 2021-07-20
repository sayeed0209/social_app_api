const app = require("./app");
const PORT = process.env.PORT;

app.get("/", (req, res) => {
	res.send("<h1>Welcome to home</h1>");
});

app.listen(PORT, () => {
	console.log("App runing on port " + PORT);
});
