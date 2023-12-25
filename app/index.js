const { ActivityType, Client, Collection, GatewayIntentBits } = require('discord.js');

const config = require('../config');

const client = new Client({intents: [Object.keys(GatewayIntentBits)]});

client.commands = new Collection();
client.cooldown = new Collection();

require('./scripts/connect-mongodb')();
require('./scripts/register-commands')(client);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}`);
    client.user.setActivity(`${client.user.username} | Anastassy.NET`, { type: ActivityType.Listening });
});

client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {
        if (!interaction.client.commands.get(interaction.commandName)) return;
        await interaction.client.commands.get(interaction.commandName).execute(client, interaction)
    }
});

client.login(config.bot.token);
