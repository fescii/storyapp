const db = require("../models");
const Booking = db.Booking
const Transaction = db.Transaction
const Op = db.Sequelize.Op;

const { arrayUtil } = require('../utils')

checkBalance =  (req, res, next) => {
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
			switch (booking.status) {
				case 'not-started':
					return res.status(200).send({
						success: false,
						status: 'not-started',
						message: "The work is not yet started, We'll be notified via phone/email."
					});
				case 'started':
					return res.status(200).send({
						success: false,
						status: 'started',
						message: "The work is started but not completed, We'll be notified via phone/email."
					});
				case 'completed':
					const price = booking.price
					if (!booking.transactions.length > 0){
						return res.status(200).send({
							success: false,
							status: 'completed',
							balance: price,
							message: "No payments made!, Please pay to view files"
						});
					}
					const transactions = arrayUtil.mapFields(booking.transactions, 'amount')
					const paidAmount = arrayUtil.sumArray(transactions)
					
					if ( paidAmount >= price ){
						next();
						return;
					}
					else	{
						const balance = price - paidAmount
						return res.status(200).send({
							success: false,
							status: 'completed',
							balance: balance,
							message: "Complete your payment to access the files"
						});
					}
				
			}
			
		})
		.catch(err => {
			console.log(err)
			res.status(500).send({
				success: false,
				message: "An error has occurred, Try again"
			});
		});
};

const bookingMiddleware = {
	checkBalance: checkBalance
};

module.exports = bookingMiddleware;