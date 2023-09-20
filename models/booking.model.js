module.exports = (sequelize, Sequelize) => {
	// const {User} = require('../models/user.model')(sequelize, Sequelize)
	const	Booking = sequelize.define("bookings", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		orderId: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		locationInfo: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		date: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		phone: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		service: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		price: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		photographers:{
			type: Sequelize.ARRAY(Sequelize.INTEGER),
			allowNull: false,
			defaultValue: []
		},
		status: {
			type: Sequelize.ENUM('started', 'completed', 'not-started'),
			defaultValue: 'completed',
			allowNull: false,
		},
	}	, {
		tableName: 'bookings'
	});
	
	const	Transaction = sequelize.define("transactions", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		transactionType: {
			type: Sequelize.ENUM('deposit', 'partial', 'full'),
			defaultValue: 'deposit',
			allowNull: false,
		},
		bookId: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		checkoutId: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		date: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		phone: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		receipt: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		amount: {
			type: Sequelize.INTEGER,
			allowNull: false,
		}
	}	, {
		tableName: 'transactions'
	});
	
	// Defining the associations
	Booking.hasMany(Transaction, {foreignKey: 'bookId'})
	Transaction.belongsTo(Booking, {foreignKey: 'bookId'})
	
	return {Transaction, Booking}
}

