const commandHandler = require('./../../commandHandler.js'); // Get the exported functions in commandHandler

module.exports = (client, disc, msg) => {
	if(!client.guild) client.guild = msg.guild
	if(msg.author.bot) return;
	if(msg.guild === null) return;
	commandHandler.handleCommand(msg, client, disc)
}