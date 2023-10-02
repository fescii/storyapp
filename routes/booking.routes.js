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
	
	//Make an order
	app.post('/api/v1/order/make', bookingController.makeOrder);
	
	//Check an order
	app.get('/api/v1/order/status', bookingController.checkStatus);
	
	//Get the order files
	app.get('/api/v1/order/check', bookingMiddleware.checkBalance, bookingController.viewFiles);
	
	//Make a schedule
	app.post('/api/v1/schedule/make', bookingController.makeSchedule);
	
	//Get the order files
	app.get('/api/v1/schedule/check', bookingController.checkAvailability);
};