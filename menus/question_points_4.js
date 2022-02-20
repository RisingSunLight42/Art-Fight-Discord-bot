const { table_user } = require("../database/database_gestion.js"); // Import de la table pour l'artfight

module.exports = {
    name: "question_points_4",
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

        //* Met à jour le message
        await interaction.update({
            content: "Tes points ont bien été comptés !",
            ephemeral: true,
            components: [],
        });
    },
};
