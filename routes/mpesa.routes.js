// const { verifySignUp } = require("../middleware");
// const controller = require("../controllers/auth.controller");
const { Mpesa } = require('../controllers')

module.exports = function(app) {
	// app.use(function(req, res, next) {
	// 	res.header(
	// 		// "Access-Control-Allow-Headers",
	// 		"x-access-token, Origin, Content-Type, Accept"
	// 	);
	// 	next();
	// });

	//route to get the auth token
	app.get('/mpesa/token', Mpesa.getAuthToken);
	
	//lipa na mpesa online
	app.post('/mpesa/lipa', Mpesa.getAuthToken, Mpesa.lipaNaMpesa);
	
	//callback url
	app.post('/mpesa/callback', Mpesa.lipaNaMpesaCallback);
	
};
