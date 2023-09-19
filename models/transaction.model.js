module.exports = (sequelize, Sequelize) => {
	// const {User} = require('../models/user.model')(sequelize, Sequelize)
	const	Transaction = sequelize.define("transactions", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		checkout_id: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		date: {
			type: Sequelize.STRING,
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

