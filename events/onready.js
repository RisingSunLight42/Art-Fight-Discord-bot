const { deploy } = require("../deploy-commands.js"); // Importe la fonction pour déployer les commandes
const {
    table_artfight_info,
    table_user,
} = require("../database/database_gestion.js"); // Import de la table pour l'artfight

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`🟢 Je suis allumé !`);
        deploy();
        table_artfight_info.sync();
        table_user.sync();
        console.log("📋 Tables des infos synchronisées !");
        await client.user.setPresence({
            activities: [{ name: "Je suis en préparation !" }],
            status: "dnd",
        });
    },
};
