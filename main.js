const commandHandler = require('./commandHandler.js'); // Get the exported functions in commandHandler
const Discord = require('discord.js'); // Getting discord module
const client = new Discord.Client();
const fs = require('fs'); // Getting file share module

client.commands = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); // Get list of all files ending with .js in "commands" folder
for(const file of commandFiles){ 
	const command = require(`./commands/${file}`); // Get exported part of file

	client.commands.set(command.name, command); // Add file to command collection
}


client.on('ready', () => { // When bot is first started
	console.log("Yes, Hello!");
});


client.on('message', msg => { // When someone sends a chat message
	commandHandler.handleCommand(msg, client, Discord);
});


fs.readFile('token.txt', 'utf8', function(err, contents){ // Read token file 
	client.login(contents) // Activate/Login the bot
});
