module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("users", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
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
		date_of_birth: {
			type: Sequelize.STRING,
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
	}, {
			freezeTableName: true
	});
	
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