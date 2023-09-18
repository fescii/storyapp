const express = require("express");
const app = express();

const routes = {};

// Importing mpesa routes
const mpesa = require('../routes/mpesa.routes');
routes.mpesa = mpesa

module.exports = routes;