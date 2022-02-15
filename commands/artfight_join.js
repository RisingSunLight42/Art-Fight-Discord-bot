// Importe le nécessaire pour réaliser la commande
const { SlashCommandBuilder } = require("@discordjs/builders");
const {
    CommandInteraction,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
const { table_artfight_info } = require("../database/database_gestion.js");

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
        //* Récupération des infos
        const id_guild = interaction.guildId;
        const info_artfight = await table_artfight_info.findOne({
            where: {
                id_guild,
            },
            attributes: ["id_guild", "nom_equipe1", "nom_equipe2"],
            raw: true,
        });

        //* Vérification si un artfight est en cours
        if (!info_artfight)
            return await interaction.reply({
                content: "Il n'y a pas d'Artfight en cours sur ce serveur !",
                ephemeral: true,
            });
    },
};
