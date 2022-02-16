// Importe le nécessaire pour réaliser la commande
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");
const {
    table_artfight_info,
    table_user,
} = require("../database/database_gestion.js");

// Crée la commande en faisant une nouvelle commande Slash
module.exports = {
    data: new SlashCommandBuilder()
        .setName("retrait_equipe")
        .setDescription(
            "Commande pour retirer un membre de son équipe. (exclusif aux admins)"
        )
        .addUserOption((option) =>
            option
                .setName("membre")
                .setDescription("Membre à retirer de son équipe.")
                .setRequired(true)
        ),
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        if (!interaction.memberPermissions.has("ADMINISTRATOR"))
            return await interaction.reply({
                content:
                    "Tu n'as pas les droits requis pour effectuer une telle action !",
                ephemeral: true,
            });
        const id_guild = interaction.guildId;
        if (!(await table_artfight_info.findOne({ where: { id_guild } })))
            return await interaction.reply({
                content: "Aucun Artfight n'est lancé sur le serveur !",
                ephemeral: true,
            });
        const id_user = interaction.options.getUser("membre").id;
        if (!(await table_user.findOne({ where: { id_guild, id_user } })))
            return await interaction.reply({
                content: "Ce membre n'a pas rejoint d'équipe !",
                ephemeral: true,
            });
        await table_user.destroy({ where: { id_guild, id_user } });
        await interaction.reply({
            content: `<@${id_user}> a bien été retiré de son équipe !`,
            ephemeral: true,
        });
    },
};
