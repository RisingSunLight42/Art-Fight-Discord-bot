const Sequelize = require('sequelize'); // Import de Sequelize

// Zone sequelize pour la base de données
const sequelize = new Sequelize({
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: './database/db.sqlite',
});

const table_artfight_info = sequelize.define("artfight", {
    id_guild: {
        type: Sequelize.SMALLINT,
        unique: true,
        primaryKey: true,
    },
    nom_equipe1: Sequelize.STRING,
    id_salon_equipe1: Sequelize.STRING,
    points_equipe1: Sequelize.INTEGER,
    nom_equipe2: Sequelize.STRING,
    id_salon_equipe2: Sequelize.STRING,
    points_equipe2: Sequelize.INTEGER,
    date: Sequelize.DATE
});