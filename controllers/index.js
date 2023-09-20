// Importing Timestamp Function
const Mpesa = require('../controllers/mpesa.controller');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller')
const bookingController = require('../controllers/booking.controller')

module.exports = {
	Mpesa,
	userController,
	authController,
	bookingController
};