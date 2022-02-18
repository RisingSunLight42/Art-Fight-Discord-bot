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
        .setName("ajout_points")
        .setDescription(
            "Commande pour ajouter des points à son équipe apèrs avoir répondu à divers questions."
        ),
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
                content: "Tu n'as pas rejoins d'équipe !",
                ephemeral: true,
            });
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId("question_points_1")
                .setPlaceholder("Tu n'as pas spécifié de partie du corps.")
                .addOptions([
                    {
                        label: "Tête",
                        description: "Correspond au visage sans les épaules.",
                        value: "10",
                    },
                    {
                        label: "Bust",
                        description: "Correspond au visage avec les épaules.",
                        value: "15",
                    },
                    {
                        label: "Halfbody",
                        description:
                            "Correspond au corps s'arrêtant jusqu'à la taille.",
                        value: "20",
                    },
                    {
                        label: "Fullbody",
                        description: "Correspond au corps entier.",
                        value: "25",
                    },
                ])
        );
        await interaction.reply({
            content: "Quelle partie du corps as-tu fait ?\nQuestion 1/4",
            ephemeral: true,
            components: [row],
        });
    },
};
