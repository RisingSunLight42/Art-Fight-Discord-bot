const fs = require('fs');                                        // Permet de lire des fichiers avec Node.js
const { Client, Collection, Intents } = require('discord.js');   // Import des classes nécessaires pour le bot
const { token } = require('./config.json');                      // Recherche des configurations dans le fichier de config

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });  // Nouvel objet client, avec les intents de guild

// Récupère les commandes
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));  // Récupère les fichiers .js des commandes se situant dans le dossier commands

for (const file of commandFiles) {                      // Parcours la liste des fichiers
    const command = require(`./commands/${file}`);      // Récupère le fichier dans la variable command
    client.commands.set(command.data.name, command);    // L'ajoute comme commande, avec pour nom le nom du fichier et comme attribut "command"
}

// Récupère les menus
client.menus = new Collection();
const menuFiles = fs.readdirSync('./menus').filter(file => file.endsWith('.js'));  // Récupère les fichiers .js des menus se situant dans le dossier menus

for (const file of menuFiles) {                  // Parcours la liste des fichiers
    const menu = require(`./menus/${file}`);     // Récupère le fichier dans la variable menu
    client.menus.set(menu.name, menu);        // L'ajoute comme menu, avec pour nom le nom du fichier et comme attribut "menu"
}

// Récupère les events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) { // Parcours la liste des fichiers
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    };
}

client.login(token); // Lance le bot