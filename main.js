	/* Changes for next Commit:
	1) Added a money to xp transfer command
	2) Fixed percentage of total market capital problem
	3) Partially-Fixed clear command bug
	4) Removed updateTM command as implemented with updateLB command
	5) Added rebirths.
	6) Rebirthing now also gives the user a money multiplier for working
	7) Added rebirths to profile
	8) Changed the xp curve to be increase steadedly following 100a^3 after each lvl
	9) Added 13 possible achivements
	10) Added a achivement checker for levels and rebirths
	11) 
*/
/*
	TODO Before release:
	1) Finish the website -- CONSIDERING
	2) Add API support to the website -- DEPENDENT
	3) Add more to the economy branch -- WORKING ON
	4) Add a Job System. -- DONE
	5) Add a guild/crew System.
	6) Add lootboxes
	7) Add an auction house
	8) Add achivements -- DONE
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
client.adminCommands = new Discord.Collection(); // All 	adminCommands Collection. Loaded from adminCommands Folder

client.votes = new Discord.Collection(); // All current votes in #voting 
client.rules = new Discord.Collection(); // All voted rules and then there are core laws set by me for some order

client.jobList = new Discord.Collection(); // All jobs Collection. Loaded from database

client.achivementList = require('./info/Achivements.js')

	// --- Global variables ---

client.emoji = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸'];

client.adminList = ['183617597365813248']; // List of super-admin IDs
client.botCount = 3 // Amount of bots in the server

client.cachedLB = {} // Cached leaderboard
client.lbMinimum = 1000 // Leaderboard minimum money required to be displayed
client.lbSize = 10 // Amount of users displayed on lb
client.totalMoney = 0 // Total capital of the whole server

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
	majorityRate: 1/2, // Voting amount required to be counted as "majority"
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