// Importe le nécessaire pour réaliser la commande
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const fs = require('fs'); // Permet d'écrire des fichiers avec Node.js

// Crée la commande en faisant une nouvelle commande Slash
module.exports = {
    data: new SlashCommandBuilder()
        .setName('initalisation')
        .setDescription('Initialise l\'Art Fight sur le serveur.')
        .addStringOption(option =>
            option.setName("Équipe 1")
                .setDescription("Nom de l'équipe 1 (veillez à ne pas donner un nom trop long !)")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("Équipe 2")
                .setDescription("Nom de l'équipe 2 (veillez à ne pas donner un nom trop long !)")
                .setRequired(true)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        // Commande
    }
}
