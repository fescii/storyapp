const jwt = require("jsonwebtoken");
const {authConfig} = require("../config");

verifyToken = (req, res, next) => {
	// let token = req.headers["x-access-token"];
	let token = req.cookies['x-access-token']
	// console.log(token)
	
	if (!token) {
		return res.redirect('/login')
	}
	
	jwt.verify(token, authConfig.secret, (err, decoded) => {
		if (err) {
			return res.redirect('/login')
		}
		
		req.userId = decoded.id;
		req.username = decoded.username
		
		next();
	});
};

const pagesMiddleware = {
	verifyToken: verifyToken
};
module.exports = pagesMiddleware;