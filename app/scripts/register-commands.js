const { REST, Routes } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');

const config = require('../../config');

module.exports = (client) => {
    const commands = [];
    const commandsPath = join(__dirname, '..', 'commands');
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
        } else {
            console.warn(`The '${filePath}' command is missing a required 'data' or 'execute' property.`);
        };
    };

    const rest = new REST().setToken(config.bot.token);

    (async () => {try {await rest.put(Routes.applicationCommands(config.bot.appId), {body: commands})} catch(error) {console.error(error)}})();
};