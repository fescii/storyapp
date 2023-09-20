const { bookingController } = require('../controllers')
const { bookingMiddleware } = require('../middleware')

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, Content-Type, Accept"
		);
		next();
	});
	
	//Make order
	app.post('/booking/order/make', bookingController.makeOrder);
	
	//Get order files
	app.get('/booking/order/check', bookingMiddleware.checkBalance, bookingController.viewFiles);
};