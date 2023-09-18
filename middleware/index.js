//Top level imports

const middlewares = {};

// Importing
const timestamp = require('../middleware/timestamp.middleware');
const mpesaData = require('../middleware/data.middleware')
middlewares.timestamp = timestamp
middlewares.mpesaData = mpesaData

module.exports = middlewares;