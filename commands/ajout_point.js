// Importe le nécessaire pour réaliser la commande
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");

// Crée la commande en faisant une nouvelle commande Slash
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ajout_points")
        .setDescription(
            "Commande pour ajouter des points à son équipe apèrs avoir répondu à divers questions."
        ),
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        // Commande
    },
};
