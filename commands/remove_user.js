// Importe le nécessaire pour réaliser la commande
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");
const {
    table_artfight_info,
    table_user,
} = require("../database/database_gestion.js");

// Crée la commande en faisant une nouvelle commande Slash
module.exports = {
    data: new SlashCommandBuilder()
        .setName("retrait_equipe")
        .setDescription("Commande pour retirer un membre de son équipe.")
        .addUserOption((option) =>
            option
                .setName("membre")
                .setDescription("Membre à retirer de son équipe.")
                .setRequired(true)
        ),
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        // Commande
    },
};
