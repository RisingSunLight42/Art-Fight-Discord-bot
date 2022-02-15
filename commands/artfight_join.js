// Importe le nécessaire pour réaliser la commande
const { SlashCommandBuilder } = require("@discordjs/builders");
const {
    CommandInteraction,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
const {
    table_artfight_info,
    table_user,
} = require("../database/database_gestion.js");

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

        //* Vérification si le membre a déjà rejoins une équipe
        if (
            !(await table_user.findOne({
                where: {
                    id_guild,
                    id_user: interaction.user.id,
                },
            }))
        )
            return await interaction.reply({
                content: "Tu as déjà rejoins une équipe !",
                ephemeral: true,
            });

        //* Création du nouveau menu pour rejoindre une équipe
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId("choix_equipe")
                .setPlaceholder("Tu n'as choisi aucune équipe.")
                .addOptions([
                    {
                        label: `${info_artfight.nom_equipe1}`,
                        description: "Tu veux rejoindre la première équipe ?",
                        value: `${info_artfight.nom_equipe1}`,
                    },
                    {
                        label: `${info_artfight.nom_equipe2}`,
                        description: "Tu veux rejoindre la seconde équipe ?",
                        value: `${info_artfight.nom_equipe1}`,
                    },
                ])
        );
        await interaction.reply({
            content: "Choisi ton équipe !",
            ephemeral: true,
            components: [row],
        });
    },
};
