const db = require("../models");
const { timeUtil, arrayUtil} = require('../utils')
const { Booking, Transaction, Schedule, User, sequelize } = db
const Op = db.Sequelize.Op;

// Booking ...
makeOrder = (req, res) => {
	return Booking.create({
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
		Schedule.findOne({
			where: sequelize.where(sequelize.fn('DATE', sequelize.col('date')), '=', booking.date),
		})
		.then(schedule => {
			if (schedule) {
				// Use a Set to ensure unique photographer IDs
				const uniquePhotographers = new Set([...schedule.photographers, ...booking.photographers]);
				
				// Convert the Set back to an array
				schedule.photographers = Array.from(uniquePhotographers);
				
				return schedule.save().then(savedSchedule => {
					if (savedSchedule) {
						res.status(200).send({
							success: true,
							message: 'Booked successfully.',
						});
					}
					else {
						res.status(400).json({
							success: true,
							message: 'Booking was successful, but failed to update schedule',
						});
					}
				});
			}
			else {
				// Create a new record if it doesn't exist
				return Schedule.create({
					date: booking.date,
					photographers: booking.photographers, // Initialize with the new photographers
					solid: false,
				})
				.then(() => {
					res.status(201).send({
						success: true,
						message: 'Booked successfully',
					});
				});
			}
		});
	})
	.catch(err => {
		console.log(err);
		return res.status(500).send({
			success: false,
			message: 'Could not add your booking, please try again!',
		});
	});
}

makeSchedule = (req, res) => {
	const { date: dateString, photographers: newPhotographers } = req.body;
	const solid = req.body.solid || false;
	
	// Parse the date string into a Date object
	const date = timeUtil.formatDate(dateString)
	
	// Try to find a record for the specified date (ignoring time)
	Schedule.findOne({
		where: sequelize.where(sequelize.fn('DATE', sequelize.col('date')), '=', date),
	})
	.then(schedule => {
		if (schedule) {
			// Use a Set to ensure unique photographer IDs
			const uniquePhotographers = new Set([...schedule.photographers, ...newPhotographers]);
			
			// Convert the Set back to an array
			schedule.photographers = Array.from(uniquePhotographers);
			
			schedule.solid = solid;
			return schedule.save().then(savedSchedule => {
				if (savedSchedule) {
					res.status(200).send({
						success: true,
						message: 'Schedule updated successfully',
					});
				}
				else {
					res.status(400).json({
						success: false,
						message: 'Failed to update schedule',
					});
				}
			});
		}
		else {
			// Create a new record if it doesn't exist
			return Schedule.create({
				date: date,
				photographers: newPhotographers, // Initialize with the new photographers
				solid: solid,
			}).then(() => {
				res.status(201).send({
					success: true,
					message: 'Schedule created successfully',
				});
			});
		}
	})
	.catch(error => {
		console.error(error);
		res.status(500).send({
			success: false,
			message: 'An error occurred, Try again later',
		});
	});
};

checkAvailability = (req, res) => {
	// Parse the date string into a Date object
	const date = timeUtil.formatDate(req.body.date)
	
	// Try to find a record for the specified date (ignoring time)
	Schedule.findOne({
			where: sequelize.where(sequelize.fn('DATE', sequelize.col('date')), '=', date),
		})
		.then(schedule => {
			if (schedule) {
				// If there is a schedule for the specified day, get the photographers
				const photographerIdsInSchedule = schedule.photographers;
				return User.findAll({
					where: {
						id: {
							[Op.notIn]: photographerIdsInSchedule,
						},
						available: true, // Filter by the 'available' field with a value of true
					},
				})
				.then((allAvailableUsers) => {
					if (allAvailableUsers.length === 0) {
						return res.status(200).send({
							available: false,
							message: 'No available photographers found.',
						});
					}
					return res.status(200).send({
						available: true,
						availablePhotographers: allAvailableUsers,
					});
				})
				.catch(error => {
					console.error(error);
					return res.status(200).send({
						available: false,
						message: 'An error occurred, Try again later',
					});
				});
			}
			else {
				return User.findAll({
					where: {
						available: true, // Filter by the 'available' field with a value of true
					},
				})
				.then((allAvailableUsers) => {
					if (allAvailableUsers.length === 0) {
						return res.status(200).send({
							available: false,
							message: 'No available photographers found.',
						});
					}
					else{
						return res.status(200).send({
							available: true,
							availablePhotographers: allAvailableUsers,
						});
					}
				})
				.catch(error => {
					console.error(error);
					return res.status(200).send({
						available: false,
						message: 'An error occurred, Try again later',
					});
				});
			}
		})
		.catch(error => {
			console.error(error);
			res.status(500).send({
				available: false,
				message: 'An error occurred, Try again later',
			});
		});
}

checkStatus =  (req, res) => {
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
	viewFiles: viewFiles,
	makeSchedule: makeSchedule,
	checkAvailability: checkAvailability
};

module.exports = bookingController;