// Importe le nécessaire pour réaliser la commande
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, Permissions } = require("discord.js");
const { table_artfight_info } = require("../database/database_gestion.js");

// Crée la commande en faisant une nouvelle commande Slash
module.exports = {
    data: new SlashCommandBuilder()
        .setName("initialisation")
        .setDescription("Commande pour initialiser l'Art Fight.")
        .addStringOption((option) =>
            option
                .setName("equipe1")
                .setDescription(
                    "Nom de l'Équipe 1, veillez à ne pas donner un nom trop long !"
                )
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("equipe2")
                .setDescription(
                    "Nom de l'Équipe 2, veillez à ne pas donner un nom trop long !"
                )
                .setRequired(true)
        ),
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        //* Vérifie qu'un artfight n'a pas déjà été lancé sur le serveur
        const id_guild = interaction.guildId;
        if (
            await table_artfight_info.findOne({
                where: {
                    id_guild,
                },
            })
        )
            return await interaction.reply({
                content: "Un artfight a déjà été lancé sur le serveur !",
                ephemeral: true,
            });

        //* Récupère les noms des équipes
        const nom_equipe1 = interaction.options.getString("equipe1");
        const nom_equipe2 = interaction.options.getString("equipe2");
        if (nom_equipe1.toLocaleLowerCase() === nom_equipe2.toLocaleLowerCase())
            return await interaction.reply({
                content: "Tu as donné des noms d'équipes identiques !",
                ephemeral: true,
            });

        //* Crée l'artfight
        const salon_equipe1 = await interaction.guild.channels.create(
            `${nom_equipe1} : 0`,
            {
                type: "GUILD_VOICE",
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone.id,
                        deny: [Permissions.FLAGS.CONNECT],
                    },
                ],
                reason: "Art Fight",
            }
        );
        const salon_equipe2 = await interaction.guild.channels.create(
            `${nom_equipe2} : 0`,
            {
                type: "GUILD_VOICE",
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone.id,
                        deny: [Permissions.FLAGS.CONNECT],
                    },
                ],
                reason: "Art Fight",
            }
        );
        let date = new Date(); // Fait un objet année, puis calcule le mois suivant et l'année suivante
        const annee = date.getUTCFullYear() + 1;
        const mois = date.getUTCMonth();
        date = new Date(annee, mois, 15);
        await table_artfight_info.create({
            id_guild,
            nom_equipe1,
            id_salon_equipe1: salon_equipe1.id,
            points_equipe1: 0,
            nom_equipe2,
            id_salon_equipe2: salon_equipe2.id,
            points_equipe2: 0,
            date,
        });
        await interaction.reply({
            content: `L'ArtFight a bien été lancé ! Il se terminera le : 15/${
                mois < 9 ? `0${mois + 1}` : mois + 1 // Les mois allant de 0 à 11, on rajoute 1, on met un 0 devant si le mois est inférieur à 9
            }/${annee}.\n*Tous les artfights finissent l'année suivante du lancement, le quinze du mois.*`,
            ephemeral: true,
        });
    },
};
