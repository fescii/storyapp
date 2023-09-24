// noinspection JSUnresolvedReference

const db = require('../models')
const { User } = db
const Op = db.Sequelize.Op

const { uploadConfig } =require('../config')

handleProfilePictureUpload = async (req, res, next) => {
	uploadConfig.uploadProfile.single('profilePicture')(req, res, async err => {
		if (err) {
			console.log(err)
			return res.status(400).json({
				success: false,
				message: 'Error uploading profile picture.'
			});
		}
		req.pathName = req.file.path;
		next()
	});
};

checkDuplicateEmail = (req, res, next) => {
	const email = req.body.email
	const userId = req.userId
	User.findOne({
			where: {
				id: {
					[Op.ne]: userId
				},
				email: email
			}
	})
	.then(user => {
		if (user) {
			return res.status(400).send({
				success: false,
				message: "Failed! Email is already in use!"
			});
		}
		else {
			next()
		}
	})
	.catch(err => {
		console.log(err)
		res.status(500).send({
			success: false,
			message: 'Internal error has occurred!, try again later'
		})
	})
}

checkDuplicateUsername = (req, res, next) => {
	const username = req.body.username
	const userId = req.userId
	User.findOne({
		where: {
				id: {
					[Op.ne]: userId
				},
				username: username
			}
	})
	.then(user => {
		if (user) {
			return res.status(400).send({
				success: false,
				message: "Failed! Username is already in use!"
			})
		}
		else {
			next()
		}
	})
	.catch(err => {
		console.log(err)
		res.status(500).send({
			success: false,
			message: 'Internal error has occurred!, try again later'
		})
	})
}

const userMiddleware = {
	handleProfilePictureUpload: handleProfilePictureUpload,
	checkDuplicateEmail: checkDuplicateEmail,
	checkDuplicateUsername: checkDuplicateUsername
};

module.exports = userMiddleware;