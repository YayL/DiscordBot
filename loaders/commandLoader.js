const fs = require('fs');

function loadFiles(client, directory){ // commands or adminCommands
	const categories = fs.readdirSync(`./${directory}`); // Get list of all files ending with .js in "commands" folder
	client.categoryList = categories
	for(const category of categories){ 
		const commandFiles = fs.readdirSync(`./${directory}/${category}`).filter(file => file.endsWith('.js'));
		for (file of commandFiles){
			const command = require(`../${directory}/${category}/${file}`); // Get exported part of file
			client[directory].set(command.name.toLowerCase(), command); // Add file to command collection
		}
	}
}

module.exports = (client, disc) => {
	['commands', 'adminCommands'].forEach(e => loadFiles(client, e));
}