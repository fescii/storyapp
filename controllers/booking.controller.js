const db = require("../models");
const { timeUtil } = require('../utils')
const Booking = db.Booking

// Booking ..
makeOrder =  (req, res) => {
	Booking.create({
		orderId: req.body.orderId,
		name: req.body.name,
		locationInfo: req.body.locationInfo,
		date: timeUtil.localTime(req.body.date),
		phone: req.body.phone,
		email: req.body.email,
		service: req.body.service,
		price: req.body.price,
		photographers: req.body.photographers,
	})
	.then(booking => {
		res.status(200).send({
			success: true,
			orderId: booking.orderId,
			email: booking.email,
			phone: booking.phone,
		});
	})
	.catch(err => {
		console.log(err)
		res.status(500).send({
			success: false,
			message: 'Could add your booking try again!'
		});
	});
};

viewFiles =  (req, res) => {
	res.status(200).send({
		success: true,
		link: 'some_drive_link',
		message: "You have fully paid, view & download files in the url provided"
	})

};

const bookingController = {
	makeOrder: makeOrder,
	viewFiles: viewFiles
};

module.exports = bookingController;