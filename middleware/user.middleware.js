const multer = require('multer');
const fs = require('fs');

// Configure Multer for file uploads
storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const username = req.username;
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');// Add leading zero if needed
		const day = currentDate.getDate().toString().padStart(2, '0'); // Add leading zero if needed
		const destination = `public/users/profile/${year}/${month}/${day}/${username}/`;
		
		// Ensure the directory exists, and then save the file in that directory
		fs.mkdirSync(destination, { recursive: true });
		cb(null, destination);
	},
	
	filename: (req, file, cb) => {
		const originalName = file.originalname; // Get the original file name
		const usernameWithExtension = `${req.username}.${originalName.split('.').pop()}`;
		cb(null, usernameWithExtension);
	},
});

const upload = multer({ storage: storage })

const handleProfilePictureUpload = async (req, res, next) => {
	upload.single('profilePicture')(req, res, async function (err) {
		if (err) {
			return res.status(400).json({ error: 'Error uploading profile picture.' });
		}
		
		try {
			// const { username } = req.body;
			// const profilePicturePath = req.file.path;
			req.pathName = req.file.path;
			
			next()
		} catch (error) {
			console.error(error);
			res.status(500).json({
				success: false,
				message: 'Internal server error.'
			});
		}
	});
};

const userMiddleware = {
	upload: upload,
	handleProfilePictureUpload: handleProfilePictureUpload
};
module.exports = userMiddleware;