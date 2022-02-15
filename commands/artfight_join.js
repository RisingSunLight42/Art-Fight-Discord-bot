// Importe le nécessaire pour réaliser la commande
const { SlashCommandBuilder } = require("@discordjs/builders");
const {
    CommandInteraction,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");

// Crée la commande en faisant une nouvelle commande Slash
module.exports = {
    data: new SlashCommandBuilder()
        .setName("rejoindre")
        .setDescription("Commande pour rejoindre un Art Fight en cours."),
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        //Commande
    },
};
