const db = require('../models')
const { User } = db

updateProfile = (req, res) => {
	try {
		const { username } = req.username;
		const profilePicturePath = req.file.path;
		
		// Storing the profilePicturePath in your database
		User.findOne({
				where: {
					username: req.username
				},
			})
			.then(user => {
				if (user) {
					// Update User Profile Picture Path
					user.profile_picture = profilePicturePath
					
					return user.save().then(savedUser => {
						if (savedUser) {
							res.status(200).send({
								success: true,
								message: 'Profile picture updated successfully',
								profilePicturePath
							});
						}
						else {
							res.status(400).json({
								success: false,
								message: 'File uploaded, but failed to update',
							});
						}
					});
				}
				else {
					res.status(400).send({
						success: false,
						message: 'An error occurred, Try again later',
					});
				}
			})
			.catch(error => {
				console.error(error);
				res.status(500).send({
					success: false,
					message: 'File uploaded, but an error has occurred, Try again later',
				});
			});
	}
	catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error, file not uploaded'
		});
	}
}

updateEmail = (req, res) => {
	const userId = req.userId
	const email = req.body.email
	
	User.findOne({
		where: {
			id: userId
		}
	})
	.then(user => {
		if (user) {
			user.email = email
			
			return user.save().then(savedUser => {
				if (savedUser) {
					res.status(200).send({
						success: true,
						message: 'Email is updated successfully'
					});
				}
				else {
					res.status(400).json({
						success: false,
						message: 'Email failed to update, try again later',
					});
				}
			})
		}
	})
	.catch(err => {
		console.log(err)
		res.status(500).send({
			success: false,
			message: 'Internal error has occurred!, try again later'
		})
	})
};

updateUsername = (req, res) => {
	const userId = req.userId
	const username = req.body.username
	
	User.findOne({
			where: {
				id: userId
			}
		})
		.then(user => {
			if (user) {
				user.username = username
				
				return user.save().then(savedUser => {
					if (savedUser) {
						res.status(200).send({
							success: true,
							message: 'Username updated successfully'
						});
					}
					else {
						res.status(400).json({
							success: false,
							message: 'Username failed to update, try again later',
						});
					}
				})
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).send({
				success: false,
				message: 'Internal error has occurred!, try again later'
			})
		})
};

adminBoard = (req, res) => {
	res.status(200).send("Admin Content.");
};

moderatorBoard = (req, res) => {
	res.status(200).send("Moderator Content.");
};

const userController = {
	updateProfile: updateProfile,
	updateEmail: updateEmail,
	updateUsername: updateUsername,
	adminBoard: adminBoard,
	moderatorBoard: moderatorBoard
};

module.exports = userController;