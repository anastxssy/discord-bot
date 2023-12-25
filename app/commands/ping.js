const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Return websocket ping.'),
    async execute(client, interaction) {
        await interaction.reply({ content: `Websocket Latency: \`${client.ws.ping}ms.\``, ephemeral: true });
        return;
    }
}
