const { dbConfig } = require('../config')

const Sequelize = require("sequelize");


// noinspection JSValidateTypes
let sequelize = new Sequelize(
	dbConfig.DB,
	dbConfig.USER,
	dbConfig.PASSWORD,
	{
		host: dbConfig.HOST,
		dialect: dbConfig.dialect,
		operatorsAliases: 0,
		
		pool: {
			max: dbConfig.pool.max,
			min: dbConfig.pool.min,
			acquire: dbConfig.pool.acquire,
			idle: dbConfig.pool.idle
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
const {Transaction, Booking, Schedule} = require('./booking.model')(sequelize, Sequelize);
Object.assign(db, { Transaction, Booking, Schedule })


// Adding Role Range
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;