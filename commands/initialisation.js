// Importe le nécessaire pour réaliser la commande
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, Permissions } = require('discord.js');
const fs = require('fs'); // Permet d'écrire des fichiers avec Node.js

// Crée la commande en faisant une nouvelle commande Slash
module.exports = {
    data: new SlashCommandBuilder()
        .setName('initialisation')
        .setDescription('Commande pour initialiser l\'Art Fight.')
        .addStringOption(option =>
            option.setName('equipe1')
                .setDescription('Nom de l\'Équipe 1, veillez à ne pas donner un nom trop long !')
                .setRequired(true))
        .addStringOption(option =>
            option.setName("equipe2")
                .setDescription("Nom de l\'Équipe 2, veillez à ne pas donner un nom trop long !")
                .setRequired(true)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        // Commande
        const nom_equipe1 = interaction.options.getString("equipe1");
        const nom_equipe2 = interaction.options.getString("equipe2");
        const salon_equipe1 = await interaction.guild.channels.create(nom_equipe1, {type: "GUILD_VOICE",
                                                                                    permissionOverwrites: [{
                                                                                        id: interaction.guild.roles.everyone.id,
                                                                                        deny: [Permissions.FLAGS.CONNECT],},],
                                                                                   reason: "Art Fight"});
        const salon_equipe2 = await interaction.guild.channels.create(nom_equipe2, {type: "GUILD_VOICE",
                                                                                    permissionOverwrites: [{
                                                                                        id: interaction.guild.roles.everyone.id,
                                                                                        deny: [Permissions.FLAGS.CONNECT],},],
                                                                                    reason: "Art Fight"});
        await interaction.reply({content: "hewo", ephemeral: true});
    }
}
