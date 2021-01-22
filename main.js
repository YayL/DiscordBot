// --- Setup stuff ---

const Discord = require('discord.js'); // Getting discord module
const client = new Discord.Client();
const fs = require('fs'); // Getting file share module

	// --- Collection Lists ---

client.commands = new Discord.Collection();
client.adminCommands = new Discord.Collection();
client.rules = new Discord.Collection();

// --- Load in commands and events --

['commandLoader', 'eventLoader'].forEach(h => {
	require(`./handlers/${h}`)(client, Discord);
})

// --- Login bot---
	
fs.readFile('token.txt', 'utf8', function(err, contents){ // Read token file 
	client.login(contents) // Activate/Login the bot
});