module.exports = (Role, sequelize) => {
	//Checks and Create Role Data Preventing Duplication
	const syncDb =  async (alter) => {
		try {
			const roles = await Role.findAll()
			
			if (roles.length === 0){
				console.log('Syncing Fresh Db...');
				sequelize.sync().then(() => {
					initiateRoles();
				});
			}
			else{
				if (alter){
					console.log('Altering Db Changes...');
					sequelize.sync({alter: true}).then(() => {
						console.log('All Changes Synced!');
					});
				}
				else {
					console.log('No Db Changes detected, Everything is Synced!');
					// console.log('Syncing Db Changes...');
					// db.sequelize.sync().then(() => {
					//   console.log('All Changes Synced!');
					// });
				}
				
			}
		} catch (e) {
			console.log("Database isn't created, Creating & Syncing Db...");
			sequelize.sync().then(() => {
				initiateRoles();
			});
		}
	}
	
	const initiateRoles = (Role) => {
		Role.create({
			id: 1,
			name: "user"
		}).then(() => {
			console.log('role-created successfully!')
		});
		
		Role.create({
			id: 2,
			name: "moderator"
		}).then(() => {
			console.log('role-created successfully!')
		});
		
		Role.create({
			id: 3,
			name: "admin"
		}).then(() => {
			console.log('role-created successfully!')
		});
	}
	
	return { syncDb, initiateRoles }
}