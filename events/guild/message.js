const commandHandler = require('./../../commandHandler.js'); // Get the exported functions in commandHandler

module.exports = (client, disc, msg) => {
	commandHandler.handleCommand(msg, client, disc);
}