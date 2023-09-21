const { signUpMiddleware } = require("../middleware");
const { authController } = require('../controllers')

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.post(
		"/api/auth/signup",
		[
			signUpMiddleware.checkDuplicateUsernameOrEmail,
			signUpMiddleware.checkRolesExisted
		],
		authController.signup
	);

	app.post("/api/auth/login", authController.signin);
};