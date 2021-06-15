var jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
	const token = req.headers["authrization"];
	console.log(token);
	// check if Bearer is undefined
	if (typeof token !== undefined) {
	} else {
		res.sendStatus(403);
	}
	next();
};
