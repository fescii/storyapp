const db = require("../models");
const { timeUtil, arrayUtil} = require('../utils')
const Booking = db.Booking
const Transaction = db.Transaction
const Op = db.Sequelize.Op;

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

checkStatus =  (req, res, next) => {
	const whereClause = {}
	if (req.body.orderId && req.body.email){
		whereClause[Op.and] = [
			{"email" : req.body.email},
			{"orderId" : req.body.orderId}
		]
	}
	else if (req.body.orderId || req.body.email){
		whereClause[Op.or] = []
		
		if (req.body.orderId){
			whereClause[Op.or].push({'orderId' : req.body.orderId})
		}
		if (req.body.email){
			whereClause[Op.or].push({"email" : req.body.email})
		}
	}
	Booking.findOne({
			where: whereClause,
			include: Transaction
		})
		.then(booking => {
			if (!booking){
				return res.status(200).send({
					success: false,
					status: 'not-found',
					message: "Booking not Found!, Check your number or Email"
				});
			}
			if (!booking.transactions.length > 0){
				return res.status(200).send({
					success: true,
					status: booking.status,
					balance: booking.price,
					message: "No payments made so far!"
				});
			}
			const transactions = arrayUtil.mapFields(booking.transactions, 'amount')
			const paidAmount = arrayUtil.sumArray(transactions)
			const balance = booking.price - paidAmount
			return res.status(200).send({
				success: true,
				status: booking.status,
				balance: balance,
				message: "Complete your payment in time"
			});
			
		})
		.catch(err => {
			console.log(err)
			res.status(500).send({
				success: false,
				message: "An error has occurred, Try again"
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
	checkStatus: checkStatus,
	viewFiles: viewFiles
};

module.exports = bookingController;