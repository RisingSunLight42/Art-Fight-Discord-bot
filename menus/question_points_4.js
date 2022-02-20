const {
    table_user,
    table_artfight_info,
} = require("../database/database_gestion.js"); // Import de la table pour l'artfight

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

        //* Récupère l'enregistrement de guild pour l'artfight
        const guild = await table_artfight_info.findOne({
            where: {
                id_guild,
            },
        });

        //* Met à jour les points de l'équipe de l'user
        user.nom_equipe === guild.nom_equipe1
            ? await guild.update({
                  points_equipe1: guild.points_equipe1 + user.points,
              })
            : await guild.update({
                  points_equipe2: guild.points_equipe2 + user.points,
              });
        await guild.save();

        //* Remet à 0 les points de l'user
        await user.update({
            points: 0,
        });
        await user.save();

        //* Récupère le salon de l'équipe aisni que ses points et met à jour son nom
        const infos_equipe =
            user.nom_equipe === guild.nom_equipe1
                ? (guild.id_salon_equipe1, guild.points_equipe1)
                : (guild.id_salon_equipe2, guild.points_equipe2);

        try {
            const salon = interaction.guild.channels.fetch(infos_equipe[0]);
            await salon.setName(`${user.nom_equipe} : ${infos_equipe[1]}`);
        } catch (error) {
            const nouveau_salon = await interaction.guild.channels.create(
                `${user.nom_equipe} : ${infos_equipe[1]}`,
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
        }
        //* Met à jour le message
        await interaction.update({
            content: "Tes points ont bien été comptés !",
            ephemeral: true,
            components: [],
        });
    },
};
