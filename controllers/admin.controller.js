const db = require('../models')
const { Booking, User, Schedule, sequelize } = db
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
				},
				status:{
					[Op.not]: 'cancelled'
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
				status: 'started',
				price: {
					[Op.gt]: sequelize.literal(`(SELECT COALESCE(SUM(transactions.amount), 0) FROM transactions WHERE "bookId" = bookings.id)`)
				}
			}
			totalBookings = await Booking.count({
				where: filter
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

getStats = async (req, res) => {
	const userId = req.userId
	
	let today = new Date();
	const priorDate = new Date(new Date().setDate(today.getDate() - 30));
	
	const totalBookings = await Booking.count()
	
	const totalCompleted = await Booking.count({
		where: {
			status : 'completed'
		}
	})
	
	const totalCancelled = await Booking.count({
		where: {
			status : 'cancelled'
		}
	})
	
	const totalUpcoming = await Booking.count({
		where : {
			date: {
				[Op.gte]: today
			}
		}
	})
	
	const upcomingBooking = await Booking.findOne({
		where : {
			date: {
				[Op.gte]: today
			}
		}
	})
	
	return res.status(201).json({
		success: true,
		totalBookings,
		totalCompleted,
		totalCancelled,
		totalUpcoming,
		upcomingBooking
		
	})
}

dashboardHeader = async (req, res) => {
	let today = new Date();
	const priorDate = new Date(new Date().setDate(today.getDate() - 30));
	
	//get user
	const user = await User.findOne({
		attributes: ['username', 'name', 'profile_picture'],
		where: {
			id: req.userId
		}
	})
	
	const last30Days = await Booking.count({
		where : {
			date: {
				[Op.gt]: priorDate,
				[Op.lt]: today
			}
		}
	})
	
	if (user && last30Days){
		res.render('pages/dashboard', {
			user: user, last30Days: last30Days
		})
	}
}

fetchPeople = (req, res) => {
	User.findAll({
			attributes: ['username',]
		})
		.then(users => {
			if(!users){
				return res.status(200).json({
					success: false,
					message: 'No Users found.'
				})
			}
			
			return res.status(200).json({
				success: true,
				users
			})
			
		})
		.catch(err => {
			console.log(err)
			return res.status(500).json({
				success: false,
				message: 'An error has occurred!'
			})
		})
}

fetchSchedules = async (req, res) => {
	const date = new Date(Date.now())
	
	Schedule.findAll({
		where: {
			date: {
				[Op.gte]: date
			}
		},
		order: [['date', 'ASC']]
		})
		.then(schedules => {
			if(!schedules){
				return res.status(200).json({
					success: false,
					message: 'No Schedules found.'
				})
			}
			
			return res.status(200).json({
				success: true,
				schedules
			})
			
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
	updateStatus, fetchBookings, getStats,
	dashboardHeader, fetchPeople, fetchSchedules
}

module.exports = adminController