const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");
const newUserId = new mongoose.Types.ObjectId();
const newUser = {
	_id: newUserId,
	firstname: "sayeed111",
	lastname: "abu",
	email: "sayeed111@gmail.com",
	password: "hola",
	tokens: [
		{
			token: jwt.sign({ _id: newUserId }, process.env.ACCESS_TOKEN_SECRET),
		},
	],
};

beforeEach(async () => {
	await User.deleteMany();
	await new User(newUser).save();
});

test("Should signup a new user", async () => {
	await request(app)
		.post("/users/create")
		.send({
			firstname: "sayeed",
			lastname: "abu",
			email: "sayeed@gmail.com",
			password: "hola",
		})
		.expect(201);
});

test("should login exsisting user", async () => {
	await request(app)
		.post("/users/login")
		.send({
			email: newUser.email,
			password: newUser.password,
		})
		.expect(200);
});

test("Should not login nonexisiting user", async () => {
	await request(app)
		.post("/users/login")
		.send({
			email: newUser.email,
			password: "ahjskhakjhskh",
		})
		.expect(400);
});
test("Should get profile for user", async () => {
	await request(app)
		.get("/users/me")
		.set("Authorization", `Bearer ${newUser.tokens[0].token}`)
		.send()
		.expect(200);
});
test("should not get profile for unauthenticated users", async () => {
	await request(app).get("/users/me").send().expect(401);
});
test("Should delete account for users", async () => {
	await request(app)
		.delete("/users/me")
		.set("Authorization", `Bearer ${newUser.tokens[0].token}`)
		.send()
		.expect(200);
});
test("Should not delete account for unauthenticated users", async () => {
	await request(app).delete("/users/me").send().expect(401);
});
