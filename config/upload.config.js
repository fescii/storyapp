const multer = require('multer');
const fs = require('fs');

// Configure Multer for file uploads
const storage = multer.diskStorage({
	destination: async (req, file, cb) => {
		const username = req.username;
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
		const day = currentDate.getDate().toString().padStart(2, '0');
		const destination = `public/users/profile/${year}/${month}/${day}/${username}/`;
		
		try {
			await fs.mkdir(destination, { recursive: true }, err => {
				if (err) {
					console.error(err);
					// Handle the error, e.g., by sending an error response
				} else {
					// Directory created successfully
				}
			});
			cb(null, destination);
		} catch (err) {
			cb(err, null);
		}
	},
	
	filename: (req, file, cb) => {
		const originalName = file.originalname; // Get the original file name
		const usernameWithExtension = `${req.username}.${originalName.split('.').pop()}`;
		cb(null, usernameWithExtension);
	},
});


const uploadConfig = {
	uploadProfile: multer({ storage: storage }),
};

module.exports = uploadConfig;