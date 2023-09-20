const authJwt = require("./auth.middleware");
const signUpMiddleware = require("./signUp.middleware");

module.exports = {
	authJwt,
	signUpMiddleware
};