const { authJwt } = require("../middleware");
const { adminController } = require('../controllers')
const paginate = require('express-paginate')

module.exports = function(app) {
	app.use(paginate.middleware(10,50))
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});
	
	//Change booking status
	app.post(
		"/api/admin/update/status",
		[authJwt.verifyToken, authJwt.isAdmin],
		adminController.updateStatus
	);
	
	//Get bookings
	app.get(
		"/api/admin/bookings",
		[authJwt.verifyToken, authJwt.isAdmin],
		adminController.fetchBookings
	);
};