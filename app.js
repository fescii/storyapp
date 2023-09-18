const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

let corsOptions = {
  origin: "http://localhost:${process.env.PORT}"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes')

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to LinkSell Connect application." });
});

// routes
// routes.mpesa(app)
require('./routes/mpesa.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

