const { deploy } = require('../deploy-commands.js'); // Importe la fonction pour déployer les commandes
const { table_artfight_info } = require("../database/database_gestion.js"); // Import de la table pour l'artfight

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Je suis allumée !`);
        deploy();
		table_artfight_info.sync();
		console.log("Table des infos synchronisée !");
        await client.user.setPresence({ activities: [{name: "Je suis en préparation !"}], status: "dnd"});
	},
};