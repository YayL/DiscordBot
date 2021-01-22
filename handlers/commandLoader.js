const fs = require('fs');

module.exports = (client, disc) => {
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Get list of all files ending with .js in "commands" folder
	for(const file of commandFiles){ 

		const command = require(`../commands/${file}`); // Get exported part of file
		client.commands.set(command.name.toLowerCase(), command); // Add file to command collection
	}

	// --- Admin Commands ---

	const adminCommandFiles = fs.readdirSync('./adminCommands').filter(file => file.endsWith('.js')); // Get list of all files ending with .js in "commands" folder
	for(const file of adminCommandFiles){ 

		const command = require(`../adminCommands/${file}`); // Get exported part of file
		client.adminCommands.set(command.name.toLowerCase(), command); // Add file to command collection
	}

}