/* Changes for next Commit:
	1) Added a job-xp curve
	2) Added profile command
	3) Increased limit of user capital
	4) Added total market capital to profile and leaderboard
	5) Fully implemented the -work command to give you XP and money when employed!
	6) Fixed guildMemberAdd problems
	7) Added 32 jobs
*/

/*
	TODO Before release:
	1) Finish the website
	2) Add API support to the website
	3) Add more to the economy branch 	
	4) Add a Job System. 
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

client.commands = new Discord.Collection(); // All commands in commands folder
client.adminCommands = new Discord.Collection(); // All commands in adminCommands folder

client.votes = new Discord.Collection(); // All current votes in #voting 
client.rules = new Discord.Collection(); // All voted rules and then there are core laws set by me for some order

client.cachedLB = {}
client.lbMinimum = 1000
client.lbSize = 10

client.jobList = new Discord.Collection();

	// --- Global variables ---

client.adminList = ['183617597365813248']; // List of admin IDs
client.botCount = 2
client.totalMoney = 0

client.categoryList = []

client.roleId = {
	admin: '802154205145464882',
	member: '802321291129651242',
	muted: '803682613377761305'
};

client.channelId = {
	commandChannels: ['801914747599061022', '804277866790518804'], // [1] Bot-Commands [2] Admin-Commands
	voting: '801914827760205885',
	rules: '801916814501347329	'
};

client.settings = {
	adminCommands: true, // If AdminCommands should be loaded
	maxRanks: 2, // Does not include member or everyone. If user is in adminlist this number does not affect them.
	majorityRate: 1/2,
};


// --- Load in commands and events ---

['commandLoader', 'eventLoader'].forEach(h => {
	require(`./loaders/${h}`)(client, Discord);
})

// --- Timed Functions ---

client.timer = {
	currentTime: {
		leaderboard: 0
	},
	time: {
		leaderboard: 5*60*1000,
		totalMoney: 10*60*1000
	}
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