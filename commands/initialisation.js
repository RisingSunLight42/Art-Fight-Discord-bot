// Importe le nécessaire pour réaliser la commande
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, Permissions } = require('discord.js');

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
        const salon_equipe1 = await interaction.guild.channels.create(`${nom_equipe1} 0`, {type: "GUILD_VOICE",
                                                                                    permissionOverwrites: [{
                                                                                        id: interaction.guild.roles.everyone.id,
                                                                                        deny: [Permissions.FLAGS.CONNECT],},],
                                                                                   reason: "Art Fight"});
        const salon_equipe2 = await interaction.guild.channels.create(`${nom_equipe2} 0`, {type: "GUILD_VOICE",
                                                                                    permissionOverwrites: [{
                                                                                        id: interaction.guild.roles.everyone.id,
                                                                                        deny: [Permissions.FLAGS.CONNECT],},],
                                                                                    reason: "Art Fight"});
        const date = new Date();
        const dict_info = {"salon_equipe_1" : salon_equipe1.id,  // Création du dictionnaire pour le fichier JSON qui stockera les infos
                        "salon_equipe_2" : salon_equipe2.id,
                        "nom_equipe_1" : nom_equipe1,
                        "nom_equipe_2" : nom_equipe2,
                        "jour_depart" : date.getUTCDate(),
                        "mois_depart" : date.getUTCMonth(),
                        "annee_depart" : date.getUTCFullYear()};
        await interaction.reply({content: "hewo", ephemeral: true});
    }
}
