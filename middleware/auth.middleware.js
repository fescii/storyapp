const jwt = require("jsonwebtoken");
const { authConfig } = require('../config')
const db = require("../models");
const { User, Role} = db;

verifyToken = (req, res, next) => {
	// let token = req.headers["x-access-token"];
	
	let token = req.cookies['x-access-token'] || req.headers["x-access-token"]
	
	if (!token) {
		return res.status(403).send({
			success: false,
			message: "No token provided!"
		})
	}
	
	jwt.verify(token, authConfig.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				success: false,
				message: "Unauthorized!"
			});
		}
		req.userId = decoded.id;
		req.username = decoded.username
		next();
	});
};

isAdmin =  (req, res, next) => {
	User.findOne({
		where: {
			"id": req.userId
		},
		include: Role
	}).then(user => {
		const roles = user.roles.map(role => role.name)
		if (roles.includes("admin")){
			next();
		}
		else	{
			res.status(403).send({
				success: false,
				message: "Require Admin Role!"
			});
		}
	});
};

isModerator =  (req, res, next) => {
	User.findOne({
		where: {
			"id": req.userId
		},
		include: Role
	}).then(user	=>	{
		const roles = user.roles.map(role => role.name)
		if (roles.includes("moderator")){
			next();
		}
		else	{
			res.status(403).send({
				success: false,
				message: "Require Moderator Role!"
			});
		}
	})
};

isModeratorOrAdmin = (req, res, next) => {
	User.findOne({
		where: {
			"id": req.userId
		},
		include: Role
	}).then(user => {
		const roles = user.roles.map(role => role.name)
		if (roles.includes("moderator") || roles.includes("admin")){
			next();
		}
		else	{
			res.status(403).send({
				success: false,
				message: "Require Moderator or Admin Role!"
			});
		}
	});
};

const authMiddleware = {
	verifyToken: verifyToken,
	isAdmin: isAdmin,
	isModerator: isModerator,
	isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authMiddleware;