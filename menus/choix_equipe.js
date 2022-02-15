const { table_user } = require("../database/database_gestion.js"); // Import de la table pour l'artfight

module.exports = {
    name: "choix_equipe",
    async execute(client, interaction) {
        await table_user.create({
            id_guild: interaction.guildId,
            id_user: interaction.user.id,
            nom_equipe: interaction.values[0],
            points: 0,
        });
        await interaction.reply({
            content: `Tu as bien rejoins l'équipe ${interaction.values[0]} !`,
            ephemeral: true,
        });
    },
};
