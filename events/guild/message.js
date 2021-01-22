const commandHandler = require('./../../commandHandler.js'); // Get the exported functions in commandHandler

module.exports = (disc, client, msg) => {
	//console.log(msg)
	commandHandler.handleCommand(msg, disc, client);
}