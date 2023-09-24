const authJwt = require("./auth.middleware");
const signUpMiddleware = require("./signup.middleware");
const bookingMiddleware = require('./booking.middleware')
const userMiddleware = require('./user.middleware')

module.exports = {
	authJwt,
	signUpMiddleware,
	bookingMiddleware,
	userMiddleware
};