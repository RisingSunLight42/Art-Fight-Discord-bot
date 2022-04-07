const { deploy } = require("../deploy-commands.js"); // Importe la fonction pour déployer les commandes
const {
    sequelize,
    table_artfight_info,
    table_user,
} = require("../database/database_gestion.js"); // Import de la table pour l'artfight

const check_date = async () => {
    // Fonction qui va check la date de chaque artfight pour voir si l'un d'entre-eux est terminé
    const infos_guild_artfight = await table_artfight_info.findAll({
        raw: true,
    });
};

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
        check_date();
        setInterval(check_date, 86400);
    },
};
