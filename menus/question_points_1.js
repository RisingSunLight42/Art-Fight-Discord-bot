const { table_user } = require("../database/database_gestion.js"); // Import de la table pour l'artfight

module.exports = {
    name: "question_points_1",
    async execute(client, interaction) {
        const id_guild = interaction.guildId;
        const id_user = interaction.user.id;
        const user = await table_user.findOne({
            where: {
                id_guild,
                id_user,
            },
        });
    },
};
