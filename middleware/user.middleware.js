const { uploadConfig } =require('../config')

handleProfilePictureUpload = async (req, res, next) => {
	uploadConfig.uploadProfile.single('profilePicture')(req, res, async err => {
		if (err) {
			return res.status(400).json({
				success: false,
				message: 'Error uploading profile picture.'
			});
		}
		req.pathName = req.file.path;
		next()
	});
};

const userMiddleware = {
	handleProfilePictureUpload: handleProfilePictureUpload
};

module.exports = userMiddleware;