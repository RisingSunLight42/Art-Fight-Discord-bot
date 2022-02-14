const handleCommand = require("../helpers/command"); // Récupère la fonction pour gérer les commandes
const handleMenu = require("../helpers/menu.js"); // Récupère la fonction pour gérer les menus

module.exports = {
    name: "interactionCreate",
    execute(interaction) {
        if (interaction.isCommand())
            handleCommand(interaction.client, interaction);
        if (interaction.isSelectMenu())
            handleMenu(interaction.client, interaction);
    },
};
