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
		[authJwt.verifyToken, userMiddleware.handleProfilePictureUpload],
		userController.updateProfile
	);

	app.post("/api/v1/user/update-email",
		[authJwt.verifyToken, userMiddleware.checkDuplicateEmail],
		userController.updateEmail
	);
	
	app.post("/api/v1/user/update-username",
		[authJwt.verifyToken, userMiddleware.checkDuplicateUsername],
		userController.updateUsername
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