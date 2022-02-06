const { deploy } = require('../deploy-commands.js'); // Importe la fonction pour déployer les commandes

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Je suis allumée !`);
        deploy();
	},
};