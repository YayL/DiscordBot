	/* Changes for next Commit:
*/
/*
	TODO Before release:
	1) Finish the website -- CONSIDERING
	2) Add API support to the website -- DEPENDENT
	3) Add more to the economy branch -- WORKING ON
	5) Add a guild/crew System.
	6) Add lootboxes
	7) Add an auction house
	6) Add money AND xp/level leaderboard
*/

// --- Setup stuff ---

const Discord = require('discord.js'); // Getting discord module
const client = new Discord.Client({
	ws: {
		intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MESSAGE_REACTIONS"]
	}
});

client.mysql = require('mysql');

const { promisify } = require('util')
client.sleep = promisify(setTimeout)

const events = require('events');

	// --- Collection Lists ---

client.pVars = require('./passwords.js');

client.m = require('./methodsLoader.js');

client.eventEm = new events.EventEmitter();

client.commands = new Discord.Collection(); // All userCommands Collection. Loaded from commands Folder
client.adminCommands = new Discord.Collection(); // All adminCommands Collection. Loaded from adminCommands Folder

client.votes = new Discord.Collection(); // All current votes in #voting 
client.rules = new Discord.Collection(); // All voted rules and then there are core laws set by me for some order

client.jobList = new Discord.Collection(); // All jobs Collection. Loaded from database

client.achivementList = require('./info/Achivements.js')

client.s = require('./info/settings.js')

	// --- Global variables ---

client.adminList = ['183617597365813248']; // List of super-admin IDs
client.botCount = 3 // Amount of bots in the server

client.cachedLB = {} // Cached leaderboard
client.totalMoney = 0 // Total capital of the whole server

client.startUpTime = 0 // Time since the bot started

client.categoryList = []

client.guild = false

client.roleId = {
	admin: '802154205145464882',
	member: '802321291129651242',
	muted: '803682613377761305'
};

client.channelId = {
	commandChannels: ['801914747599061022', '804277866790518804'], // [1] Bot-Commands [2] Admin-Commands
	voting: '801914827760205885',
	rules: '801916814501347329',
	errors: '842354024573566986'
};


// --- Load in commands and events ---

['commandLoader', 'eventLoader'].forEach(h => {
	require(`./loaders/${h}`)(client, Discord);
})

// --- Timed Functions ---

client.timer = {
	leaderboard: 0 // Time of last update
}	

const timers = require('./timers.js')
timers.leaderboard(client);
timers.totalMoney(client);

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

// --- Login bot ---

client.login(client.pVars.token) // Activate/Login the bot-commands