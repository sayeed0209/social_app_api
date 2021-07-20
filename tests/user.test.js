const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

const newUser = {
	firstname: "sayeed111",
	lastname: "abu",
	email: "sayeed111@gmail.com",
	password: "hola",
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
