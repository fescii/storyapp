module.exports = (sequelize, Sequelize) => {
	// noinspection JSUnresolvedFunction
	const User = sequelize.define("users", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		username: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		phone: {
			type: Sequelize.STRING,
			allowNull: false
		},
		dob: {
			type: Sequelize.DATE,
			allowNull: true
		},
		bio: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		profile_picture: {
			type: Sequelize.STRING,
			allowNull: true
		},
		available: {
			type: Sequelize.BOOLEAN,
			defaultValue: true,
			allowNull: false,
		},
	}, {
			freezeTableName: true
	});
	
	// noinspection JSUnresolvedFunction
	const Role = sequelize.define("roles", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING
		}
	}	, {
		tableName: 'roles'
	});
	
	Role.belongsToMany(User, {
		through: "user_roles",
		foreignKey: "roleId",
		otherKey: "userId"
	});
	
	User.belongsToMany(Role, {
		through: "user_roles",
		foreignKey: "userId",
		otherKey: "roleId"
	});
	
	return {User, Role}
}