const { deploy } = require('../deploy-commands.js'); // Importe la fonction pour déployer les commandes

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Je suis allumée !`);
        deploy();
        await client.user.setPresence({ activities: [{name: "Je suis en préparation !"}], status: "dnd"});
	},
};