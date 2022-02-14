const { Client, CommandInteraction } = require("discord.js"); // Import des classes nécessaires pour les commandes

/**
 * Permet de gérer les commandes du bot
 * @param {Client} client
 * @param {CommandInteraction} interaction
 */
const menuCommand = async (client, interaction) => {
    const menu = client.menus.get(interaction.customID); // Récupère le menu exécuté

    if (!menu) return; // Il ne fait rien si la commande est vide

    try {
        await menu.execute(client, interaction); // Essaye d'exécuter l'interaction
    } catch (error) {
        // S'il y a une erreur, renvoi un message d'erreur éphémère
        console.error(error);
        await interaction.reply({
            content:
                "Une erreur est survenue durant l'exécution de la commande.",
            ephemeral: true,
        });
    }
};

module.exports = menuCommand;
