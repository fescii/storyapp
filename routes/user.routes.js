const { authJwt, userMiddleware } = require("../middleware");
const { userController } = require('../controllers')

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});
	
	app.post('/api/v1/user/update-profile-picture',
		[authJwt.verifyToken, userMiddleware.upload.single('profilePicture')],
		userController.updateProfile
	);

	app.get("/api/test/all", userController.allAccess);

	app.get(
		"/api/test/user",
		[authJwt.verifyToken],
		userController.userBoard
	);

	app.get(
		"/api/test/mod",
		[authJwt.verifyToken, authJwt.isModerator],
		userController.moderatorBoard
	);

	app.get(
		"/api/test/admin",
		[authJwt.verifyToken, authJwt.isAdmin],
		userController.adminBoard
	);
};