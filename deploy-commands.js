const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, token } = require("./config.json");

const commands = [];
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js")); // Récupère les fichiers .js des commandes se situant dans le dossier commands

for (const file of commandFiles) {
    // Parcours la liste de fichiers
    const command = require(`./commands/${file}`); // Récupère le fichier dans la variable command
    commands.push(command.data.toJSON()); // Envoie la commande en format JSON
}

const rest = new REST({ version: "9" }).setToken(token); // Récupère l'API Discord

const deploy = async () => {
    try {
        // Envoie les commandes (/) globales à l'API pour les utiliser
        await rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        });
        console.log("🧪 Les commandes (/) globales ont été enregistrées.");
    } catch (error) {
        console.error(error);
    }
};

module.exports = { deploy };
