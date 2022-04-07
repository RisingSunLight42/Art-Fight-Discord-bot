const { Permissions } = require("discord.js");
const {
    table_artfight_info,
    table_user,
} = require("../database/database_gestion.js"); // Import de la table pour l'artfight

const check_date = async (client) => {
    // Fonction qui va check la date de chaque artfight pour voir si l'un d'entre-eux est terminé
    const artfights = await table_artfight_info.findAll({
        raw: true,
    });
    const date_jour = new Date();
    for (const artfight of artfights) {
        const date_fin = new Date(artfight.date);
        if (
            // Vérifie si la date du jour est identique
            date_fin.getUTCFullYear() === date_jour.getUTCFullYear() &&
            date_fin.getUTCMonth() === date_jour.getUTCMonth() &&
            date_fin.getUTCDate() === date_jour.getUTCDate()
        ) {
            const id_guild = artfight.id_guild;
            const guild = await client.guilds.fetch(id_guild);
            await table_artfight_info.destroy({ where: { id_guild } });
            await table_user.destroy({ where: { id_guild } });

            //* Récupère les salons s'ils existent
            let salon_equipe1 = "variable_vide";
            let salon_equipe2 = "variable_vide";
            try {
                salon_equipe1 = await guild.channels.fetch(
                    artfight.id_salon_equipe1
                );
            } catch (error) {
                console.log("Un salon n'existe plus.");
            }
            try {
                salon_equipe2 = await guild.channels.fetch(
                    artfight.id_salon_equipe2
                );
            } catch (error) {
                console.log("Un salon n'existe plus.");
            }

            //* Supprime les salons s'ils existent
            if (!(salon_equipe1 === "variable_vide")) {
                await salon_equipe1.delete("Fin de l'Artfight");
            }
            if (!(salon_equipe2 === "variable_vide")) {
                await salon_equipe2.delete("Fin de l'Artfight");
            }

            //* Récupère le salon d'annonce
            let salon_annonce = "";
            try {
                salon_annonce = await guild.channels.fetch(
                    artfight.id_salon_annonce
                );
            } catch (error) {
                // Si le salon n'existe pas, le crée
                await guild.channels.create(`Artfight-fin`, {
                    type: "GUILD_TEXT",
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone.id,
                            deny: [Permissions.FLAGS.SEND_MESSAGES],
                        },
                    ],
                    position: 0,
                    reason: "Annonce de la fin de l'artfight",
                });
            }

            await salon_annonce.send(
                `${
                    artfight.points_equipe1 === artfight.points_equipe2
                        ? "C'est un ex-aequo parfait ! Bravo à tous !"
                        : `Bravo à l'équipe ${
                              artfight.points_equipe1 > artfight.points_equipe2
                                  ? `${artfight.nom_equipe1}`
                                  : `${artfight.nom_equipe2}`
                          } pour avoir gagné cet artfight !`
                }`
            );
        }
    }
};

module.exports = { check_date };
