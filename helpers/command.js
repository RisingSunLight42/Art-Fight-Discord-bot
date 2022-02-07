const { Client, CommandInteraction } = require('discord.js');   // Import des classes nécessaires pour les commandes

/**
 * Permet de gérer les commandes du bot
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
const handleCommand = async (client, interaction) => {
    const command = client.commands.get(interaction.commandName);   // Récupère la commande exécutée

    if (!command) return;                                           // Il ne fait rien si la commande est vide

    try {
        await command.execute(interaction);                         // Essaye d'exécuter l'interaction
    } catch (error) {                                               // S'il y a une erreur, renvoi un message d'erreur éphémère
        console.error(error);
        await interaction.reply({content: "Une erreur est survenue durant l'exécution de la commande.", ephemeral: true})
    }
}

module.exports = handleCommand;