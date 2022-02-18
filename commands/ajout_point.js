// Importe le nécessaire pour réaliser la commande
const { SlashCommandBuilder } = require("@discordjs/builders");
const {
    CommandInteraction,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");

// Crée la commande en faisant une nouvelle commande Slash
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ajout_points")
        .setDescription(
            "Commande pour ajouter des points à son équipe apèrs avoir répondu à divers questions."
        ),
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const row = new MessageActionRow.addComponents(
            new MessageSelectMenu()
                .setCustomId("question_points_1")
                .setPlaceholder("Tu n'as pas spécifié de partie du corps.")
                .addOptions([
                    {
                        label: "Tête",
                        description: "Correspond au visage sans les épaules",
                        value: "10",
                    },
                ])
        );
    },
};
