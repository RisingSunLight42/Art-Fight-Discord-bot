const handleCommand = require('../helpers/command');             // Récupère la fonction pour gérer les commandes

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
        if (interaction.isCommand()) handleCommand(interaction.client, interaction);
	},
};