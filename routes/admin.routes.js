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
		"/api/v1/admin/update/status",
		[authJwt.verifyToken, authJwt.isAdmin],
		adminController.updateStatus
	);
	
	//Get admin stats
	app.get(
		"/api/v1/admin/stats",
		[authJwt.verifyToken, authJwt.isAdmin],
		adminController.getStats
	)
	
	//Get bookings
	app.get(
		"/api/v1/admin/bookings",
		[authJwt.verifyToken, authJwt.isAdmin],
		adminController.fetchBookings
	)
	
	//Get schedules
	app.get(
		"/api/v1/admin/schedules",
		[authJwt.verifyToken, authJwt.isAdmin],
		adminController.fetchSchedules
	)
	
	//Get people
	app.get(
		"/api/v1/admin/people",
		[authJwt.verifyToken, authJwt.isAdmin],
		adminController.fetchPeople
	)
}