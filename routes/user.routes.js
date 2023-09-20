const { authJwt } = require("../middleware");
const { userController } = require('../controllers')

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/test/all", userController.allAccess);

	app.get(
		"/test/user",
		[authJwt.verifyToken],
		userController.userBoard
	);

	app.get(
		"/test/mod",
		[authJwt.verifyToken, authJwt.isModerator],
		userController.moderatorBoard
	);

	app.get(
		"/test/admin",
		[authJwt.verifyToken, authJwt.isAdmin],
		userController.adminBoard
	);
};