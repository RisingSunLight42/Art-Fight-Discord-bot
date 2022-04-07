const { deploy } = require("../deploy-commands.js"); // Importe la fonction pour déployer les commandes
const { sequelize } = require("../database/database_gestion.js"); // Import de la table pour l'artfight
const { check_date } = require("../helpers/check_date.js"); // Import de la fonction de check de dates

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`🟢 Je suis allumé !`);
        deploy();
        sequelize.sync();
        console.log("📋 Tables des infos synchronisées !");
        await client.user.setPresence({
            activities: [{ name: "Je suis en préparation !" }],
            status: "dnd",
        });
        check_date(client);
        setInterval(check_date, 86400, client);
    },
};
