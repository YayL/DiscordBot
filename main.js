/* Changes:
	1) Added MySQL database support
	2) Added a balance command
	3) Added some error message replies for users executing the command
	4) Removed a uncessesary folder which I forgot to remove before
	5) Changed how the previous "customMethod" file was handled and now it is all seperated into
	   category groups within the methods folder to make it clearer.
	6) Got rid of -clear all as it did not work as it should. You can now input a value over 100
	   and it'll work fine.
*/

// --- Setup stuff ---

const Discord = require('discord.js'); // Getting discord module
const client = new Discord.Client();
const fs = require('fs'); // Getting file share module

client.mysql = require('mysql');

	// --- Collection Lists ---

client.pVars = require('./passwords.js');

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

// --- MySQL ---

client.con = client.mysql.createConnection({
			host: "localhost",
			user: "root",
			password: client.pVars.dbPass,
			database: client.pVars.database
		});

client.con.connect(err => {
	if(err) throw err;
	console.log("Connected to DB!");
});

// --- Login bot & connect SQl DB---

client.login(client.pVars.token) // Activate/Login the bot-commands