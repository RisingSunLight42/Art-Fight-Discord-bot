const Sequelize = require("sequelize"); // Import de Sequelize

// Zone sequelize pour la base de données
const sequelize = new Sequelize({
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    // SQLite only
    storage: "./database/db.sqlite",
});

// Initialisation de la table d'infos des artfights
const table_artfight_info = sequelize.define("artfight", {
    id_guild: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
    },
    nom_equipe1: Sequelize.STRING,
    id_salon_equipe1: Sequelize.STRING,
    points_equipe1: Sequelize.INTEGER,
    nom_equipe2: Sequelize.STRING,
    id_salon_equipe2: Sequelize.STRING,
    points_equipe2: Sequelize.INTEGER,
    id_salon_annonce: Sequelize.STRING,
    date: Sequelize.DATE,
});

// Initialisation de la table des users
const table_user = sequelize.define("user", {
    id_guild: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
    },
    id_user: Sequelize.STRING,
    nom_equipe: Sequelize.STRING,
    points: Sequelize.SMALLINT,
});

module.exports = { sequelize, table_artfight_info, table_user };
