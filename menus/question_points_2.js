const { table_user } = require("../database/database_gestion.js"); // Import de la table pour l'artfight
const { MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "question_points_2",
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
                .setCustomId("question_points_3")
                .setPlaceholder("Tu n'as pas spécifié de style.")
                .addOptions([
                    {
                        label: "",
                        description: "",
                        value: "",
                    },
                    {
                        label: "",
                        description: "",
                        value: "",
                    },
                    {
                        label: "",
                        description: "",
                        value: "",
                    },
                ])
        );
        await interaction.update({
            content: "Dans quel style est le dessin ?\nQuestion 3/4",
            ephemeral: true,
            components: [row],
        });
    },
};
