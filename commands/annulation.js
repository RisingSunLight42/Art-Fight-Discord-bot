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
        .setName("annulation")
        .setDescription("Commande pour annuler l'Art Fight en cours."),
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        //* Vérifie si un artfight existe
        const id_guild = interaction.guildId;
        const infos_artfight = await table_artfight_info.findOne({
            where: {
                id_guild,
            },
            attributes: ["id_salon_equipe1", "id_salon_equipe2"],
            raw: true,
        });
        if (!infos_artfight)
            return await interaction.reply({
                content: "Il n'y a pas d'Artfight en cours sur le serveur !",
                ephemeral: true,
            });

        //* Récupère les salons s'ils existent
        let salon_equipe1 = "variable_vide";
        let salon_equipe2 = "variable_vide";
        try {
            salon_equipe1 = await interaction.guild.channels.fetch(
                infos_artfight.id_salon_equipe1
            );
        } catch (error) {
            console.log("Un salon n'existe plus.");
        }
        try {
            salon_equipe2 = await interaction.guild.channels.fetch(
                infos_artfight.id_salon_equipe2
            );
        } catch (error) {
            console.log("Un salon n'existe plus.");
        }

        //* Supprime les salons s'ils existent
        if (!(salon_equipe1 === "variable_vide")) {
            await salon_equipe1.delete("Annulation de l'Artfight");
        }
        if (!(salon_equipe2 === "variable_vide")) {
            await salon_equipe2.delete("Annulation de l'Artfight");
        }

        //* Suppression de l'enregistrement dans la base de données
        await table_artfight_info.destroy({ where: { id_guild } });
        await table_user.destroy({ where: { id_guild } });
        await interaction.reply({
            content: "L'Artfight a bien été annulé !",
            ephemeral: true,
        });
    },
};
