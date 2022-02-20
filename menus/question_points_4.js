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

        //* Vérifie si l'on ajoute des points ou pas
        const points =
            interaction.values[0] === "0"
                ? user.points + 10
                : Math.round(user.points * 1.05);
        await user.update({
            points,
        });
        await user.save();

        //* Met à jour le message
        await interaction.update({
            content: "Tes points ont bien été comptés !",
            ephemeral: true,
            components: [],
        });
    },
};
