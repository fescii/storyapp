const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
let sequelize = new Sequelize(
	config.DB,
	config.USER,
	config.PASSWORD,
	{
		host: config.HOST,
		dialect: config.dialect,
		operatorsAliases: 0,
		
		pool: {
			max: config.pool.max,
			min: config.pool.min,
			acquire: config.pool.acquire,
			idle: config.pool.idle
		}
	}
);

const db = {};

// Adding sequelize to db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importing From User Model
const {User, Role} = require('../models/user.model')(sequelize, Sequelize);
Object.assign(db, {User, Role})

// Importing From Post Model
const {Transaction} = require('./transaction.model')(sequelize, Sequelize);
Object.assign(db, { Transaction })


// Adding Role Range
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;