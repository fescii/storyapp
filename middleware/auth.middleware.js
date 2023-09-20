const jwt = require("jsonwebtoken");
const { authConfig } = require('../config')
const db = require("../models");
const User = db.User;
const Role = db.Role;

verifyToken = (req, res, next) => {
	let token = req.headers["x-access-token"];
	
	if (!token) {
		return res.status(403).send({
			message: "No token provided!"
		});
	}
	
	jwt.verify(token, authConfig.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!"
			});
		}
		req.userId = decoded.id;
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