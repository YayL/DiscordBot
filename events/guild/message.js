const commandHandler = require('./../../commandHandler.js'); // Get the exported functions in commandHandler

module.exports = (disc, client, msg) => {
	commandHandler.handleCommand(msg, disc, client);
}