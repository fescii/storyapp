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
			if (booking){
				const price = booking.price
				// console.log(booking.transactions)
				if (booking.transactions.length > 0){
					const transactions = arrayUtil.mapFields(booking.transactions, 'amount')
					const paidAmount = arrayUtil.sumArray(transactions)
					// console.log(transactions)
					// console.log(paidAmount)
					
					if ( paidAmount >= price ){
						next();
					}
					else	{
						const balance = price - paidAmount
						// console.log(balance)
						res.status(200).send({
							success: true,
							balance: balance,
							message: "Complete your payment to access the files"
						});
					}
				}
				else {
					res.status(200).send({
						success: false,
						balance: price,
						message: "No payments made!, Please pay to view files"
					});
				}
			}
			else	{
				res.status(200).send({
					success: false,
					message: "Booking not Found!, Check your number or Email"
				});
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