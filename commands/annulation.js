// Importe le nécessaire pour réaliser la commande
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { table_artfight_info } = require('../database/database_gestion.js');

// Crée la commande en faisant une nouvelle commande Slash
module.exports = {
    data: new SlashCommandBuilder()
        .setName('annulation')
        .setDescription('Commande pour annuler l\'Art Fight en cours.'),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const id_guild = interaction.guildId;
        if (!await table_artfight_info.findOne({
            where: {
                id_guild
            }
        })) return await interaction.reply({
            content: "Il n'y a pas d'Artfight en cours sur le serveur !",
            ephemeral: true
        });
    }
}
