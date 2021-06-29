const fs = require('fs');

function loadFiles(client, directory){ // commands or adminCommands
	const categories = fs.readdirSync(`./${directory}`); // Get list of all categories of commands in dir
	client.categoryList = categories
	for(const category of categories){
		const commandFiles = fs.readdirSync(`./${directory}/${category}`).filter(file => file.endsWith('.js')); // Get all commands in category
		for (file of commandFiles){
			const command = require(`../${directory}/${category}/${file}`); // Get exported part of file
			client[directory].set(command.name.toLowerCase(), command); // Add file to command collection
		}
	}
}

module.exports = (client, disc) => {
	['adminCommands', 'commands'].forEach(e => loadFiles(client, e));
}
