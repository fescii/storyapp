//Top level imports

const middlewares = {};

// Importing
const Time  = require('./time.middleware');
const mpesaData = require('../middleware/data.middleware')

middlewares.Time = Time
middlewares.mpesaData = mpesaData

module.exports = middlewares;