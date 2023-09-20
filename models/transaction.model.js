module.exports = (sequelize, Sequelize) => {
	// const {User} = require('../models/user.model')(sequelize, Sequelize)
	const	Transaction = sequelize.define("transactions", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		orderId: {
			type: Sequelize.STRING,
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
	
	return {Transaction}
}

