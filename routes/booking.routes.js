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
	app.post('/api/order/make', bookingController.makeOrder);
	
	//Check an order
	app.get('/api/order/status', bookingController.checkStatus);
	
	//Get the order files
	app.get('/api/order/check', bookingMiddleware.checkBalance, bookingController.viewFiles);
	
	//Make a schedule
	app.post('/api/schedule/make', bookingController.makeSchedule);
	
	//Get the order files
	app.get('/api/schedule/check', bookingController.checkAvailability);
};