const { deploy } = require("../deploy-commands.js"); // Importe la fonction pour déployer les commandes
const { sequelize } = require("../database/database_gestion.js"); // Import de la table pour l'artfight

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
    },
};
