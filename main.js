/* Changes:
	
*/

// TODO: Add command replies if something goes wrong like incorrect argumentes or something

// --- Setup stuff ---

const Discord = require('discord.js'); // Getting discord module
const client = new Discord.Client();
const fs = require('fs'); // Getting file share module

	// --- Collection Lists ---

client.commands = new Discord.Collection(); // All commands in commands folder
client.adminCommands = new Discord.Collection(); // All commands in adminCommands folder

client.votes = new Discord.Collection(); // All current votes in #voting 
client.rules = new Discord.Collection(); // All voted rules and then there are core laws set by me for some order

	// --- Global variables ---

client.guildId = '801908963275702314';

client.adminList = ['183617597365813248']; // List of admin IDs
client.botCount = 2

client.roleId = {
	admin: '802154205145464882',
	member: '802321291129651242',
	muted: '803682613377761305'
};

client.channelId = {
	commands: '801914747599061022',
	voting: '801914827760205885'
};

client.settings = {
	adminCommands: true, // If AdminCommands should even be loaded
	maxRanks: 2, // Does not include member or everyone. If user is in adminlist this number does not affect them.
	majorityRate: 1/2,
};


// --- Load in commands and events --

['commandLoader', 'eventLoader'].forEach(h => {
	require(`./loaders/${h}`)(client, Discord);
})

// --- Login bot---

fs.readFile('token.txt', 'utf8', function(err, contents){ // Read token file 
	client.login(contents) // Activate/Login the bot-commands
});