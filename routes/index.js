
// Importing mpesa routes
const mpesa = require('../routes/mpesa.routes');
const auth = require('../routes/auth.routes');
const user = require('../routes/user.routes');
const booking = require('../routes/booking.routes')
const admin = require('../routes/admin.routes')
const pages = require('../routes/pages.routes')

const routes = app => {
	mpesa(app);
	auth(app);
	user(app);
	booking(app);
	admin(app);
	pages(app)
}

module.exports = routes