const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const user = await User.findOne({
			_id: decodedToken._id,
			"tokens.token": token,
		});
		if (!user) {
			throw new Error();
		}
		req.user = user;
		next();
	} catch (err) {
		res.status(401).send({ error: "Please authenticate" });
	}
};
// module.exports = (req, res, next) => {
// 	const authHeader = req.headers["authorization"];
// 	const token = authHeader && authHeader.split(" ")[1];
// 	if (token == null) return res.sendStatus(401);
// 	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
// 		// console.log(err);
// 		console.log(user);
// 		if (err) return res.sendStatus(403);
// 		req.user = user;
// 		next();
// 	});
// };
module.exports = auth;
