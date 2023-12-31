const { pagesMiddleware } = require('../middleware')
const { adminController} = require("../controllers");

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			// "token, Origin, Content-Type, Accept"
		);
		
		next();
	});
	
	app.get("/login", (req, res) => {
		res.render('pages/login')
	});
	
	app.get(
		"/dashboard", pagesMiddleware.verifyToken,
		adminController.dashboardHeader
	);
	
};
