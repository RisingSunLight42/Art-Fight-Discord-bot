const Sequelize = require('sequelize'); // Import de Sequelize

// Zone sequelize pour la base de données
const sequelize = new Sequelize({
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: './database/db.sqlite',
});