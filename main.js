const commandHandler = require('./commandHandler.js');

const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command); 
}

client.on('ready', () => {
	console.log("Yes, Hello!");
});

client.on('message', msg => {
	commandHandler.handleCommand(msg, client.commands);
});

fs.readFile('token.txt', 'utf8', function(err, contents){
	client.login(contents)
});
