const db = require('../models')
const { Booking } = db
const Op = db.Sequelize.Op
const { timeUtil } = require('../utils')

updateStatus = (req, res) => {
	const { id , status } = req.body
	Booking.findOne({
		where: {
			"id": id
		},
	})
	.then(booking => {
		booking.status = status
		booking.save().then(savedBooking => {
			if (savedBooking) {
				return res.status(200).send({
					success: true,
					message: 'Booking updated successfully.',
				});
			}
			else {
				return res.status(400).json({
					success: false,
					message: 'The update was unsuccessful',
				});
			}
		});
	})
	.catch(err => {
		console.log(err)
		return res.status(400).json({
			success: false,
			message: 'The update was unsuccessful',
		});
	})
};

fetchBookings = async (req, res) => {
	const { date , status } = req.body
	
	// Parse the date string into a Date object
	const dateObj = timeUtil.formatDate(date)
	let filter, totalBookings;
	
	switch (status) {
		case 'all':
			filter = {}
			totalBookings = await Booking.count()
			break
		case 'upcoming':
			filter = {
				date: {
					[Op.gte]: dateObj
				}
			}
			totalBookings = await Booking.count({
				where : filter
			})
			break;
		case 'completed':
			filter = {
				status : 'completed'
			}
			totalBookings = await Booking.count({
				where : filter
			})
			break
		case 'pending':
			filter = {
				status : 'pending'
			}
			totalBookings = await Booking.count({
				where : filter
			})
			break
		case 'cancelled':
			filter = {
				status : 'cancelled'
			}
			totalBookings = await Booking.count({
				where : filter
			})
			break
	}
	
	//Extract the page number and limit from the request
	const page = parseInt(req.query.page) || 1
	// const limit =  parseInt(req.query.limit) || 10
	
	const limit =  5
	
	//Total Pages
	const totalPages = Math.ceil(totalBookings / limit)
	
	//Check if requested page is out of range or invalid
	
	if (page < 1 || page > totalPages || isNaN(page)){
		return res.status(400).json({
			success: false,
			message: 'Page out of range.'
		})
	}
	
	//Calculate the offset based on the page and limit
	const offset = (page - 1) * limit;
	
	//Query the Bookings
	Booking.findAll({
		limit,
		offset,
		where : filter
	})
	.then(bookings => {
		if(!bookings){
			return res.status(400).json({
				success: false,
				message: 'No bookings found.'
			})
		}
		else{
			return res.status(200).json({
				success: true,
				bookings,
				pagination: {
					currentPage: page,
					totalPages,
					totalBookings
				}
			})
		}
	})
	.catch(err => {
		console.log(err)
		return res.status(500).json({
			success: false,
			message: 'An error has occurred!'
		})
	})
	
}

const adminController = {
	updateStatus: updateStatus,
	fetchBookings: fetchBookings
}

module.exports = adminController