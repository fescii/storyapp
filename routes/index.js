
// Importing mpesa routes
const mpesa = require('../routes/mpesa.routes');
const auth = require('../routes/auth.routes');
const user = require('../routes/user.routes');
const booking = require('../routes/booking.routes')

const routes = {
	mpesa: mpesa,
	auth: auth,
	user: user,
	booking: booking
}

module.exports = routes