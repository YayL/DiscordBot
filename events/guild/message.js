const commandHandler = require('./../../commandHandler.js'); // Get the exported functions in commandHandler

module.exports = (client, discord, msg) => {
	if(msg.author.bot) return;
	if(!client.guild) client.guild = msg.guild
	commandHandler.handleCommand(msg, client, discord)
}