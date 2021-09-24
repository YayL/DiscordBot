const { dir } = require('console');
const fs = require('fs');

function loadFiles(client, directory){ // commands or adminCommands
	const categories = fs.readdirSync(`./${directory}`); // Get list of all categories of commands in dir
	
	if(directory == 'adminCommands') client.adminCategoryList = categories
	else client.categoryList = categories

	for(const category of categories){
		const commandFiles = fs.readdirSync(`./${directory}/${category}`).filter(file => file.endsWith('.js')); // Get all commands in category
		for (file of commandFiles){
			const command = require(`../${directory}/${category}/${file}`); // Get exported part of file
			client[directory].set(command.name.toLowerCase(), command); // Add file to command collection
			
			const c = directory+'Categories';

			if(client[c][category.toLowerCase()] == undefined)
				client[c][category.toLowerCase()] = []
			client[c][category.toLowerCase()].push(command.name.toLowerCase());
		}
	}
}

module.exports = (client, disc) => {
	['adminCommands', 'commands'].forEach(category => loadFiles(client, category));
	client.msg.log("INFO", 'Finished loading all Commands!');
}
