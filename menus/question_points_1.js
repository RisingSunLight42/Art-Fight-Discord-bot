const { table_user } = require("../database/database_gestion.js"); // Import de la table pour l'artfight
const { MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "question_points_1",
    async execute(client, interaction) {
        //* Récupération de l'enregistrement de l'utilisateur
        const id_guild = interaction.guildId;
        const id_user = interaction.user.id;
        const user = await table_user.findOne({
            where: {
                id_guild,
                id_user,
            },
        });

        //* Mise à jour de l'enregistrement
        await user.update({
            points: user.points + parseInt(interaction.values[0]),
        });
        await user.save();

        //* Création du second menu
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId("question_points_2")
                .setPlaceholder("Tu n'as pas spécifié d'étape.")
                .addOptions([
                    {
                        label: "Sketch",
                        description:
                            "Correspond à un dessin à l'état de sketch.",
                        value: "5",
                    },
                    {
                        label: "Lineart",
                        description:
                            "Correspond à un dessin avec juste le lineart.",
                        value: "15",
                    },
                    {
                        label: "Flatcolor",
                        description: "Correspond à un dessin sans ombres.",
                        value: "25",
                    },
                    {
                        label: "Simple Shade",
                        description: "Correspond à un dessin ombré simplement.",
                        value: "45",
                    },
                    {
                        label: "Complex Shade",
                        description:
                            "Correspond à un dessin avec des ombres complexes.",
                        value: "65",
                    },
                    {
                        label: "Painting",
                        description: "Correspond à un style peinture.",
                        value: "85",
                    },
                ])
        );
        await interaction.update({
            content: "À quelle étape est le dessin ?\nQuestion 2/4",
            ephemeral: true,
            components: [row],
        });
    },
};
