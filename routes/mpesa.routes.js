const { Mpesa } = require('../controllers')

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			// "token, Origin, Content-Type, Accept"
		);
		next();
	});

	//route to get the auth token
	// app.get('/mpesa/token', Mpesa.getAuthToken);
	
	//lipa na mpesa online
	app.post('api/mpesa/lipa', Mpesa.getAccessToken, Mpesa.lipaNaMpesa);
	
	//callback url
	app.post('api/mpesa/callback/:orderId/:bookId', Mpesa.lipaNaMpesaCallback);
	
	//callback url
	app.post('api/mpesa/confirm/:CheckoutRequestID', Mpesa.getAccessToken, Mpesa.confirmPayment);
	
};
