// Current version: Market Update 0.8
// Next Version: Limiteds Update 0.9

	/* Changes for next Commit:
	

    TODO NEXT:
	1) Add a timer that every 5 minutes checks the listings with the lowest deadline if they have expiered and removes them
	2) Add a command like -mylistings to be able to take down your listings
	3) Add limited items


	TODO Before full release:
	1) Add more than 50 items
	2) Add benefits to being in a gang
	3) Add gang upgrades
	4) Add gang ranks customisable by the owner
	5) Add gang leaderboards

*/

// --- Setup stuff ---

const Discord = require('discord.js'); // Getting discord module
const client = new Discord.Client({
	restTimeOffset: 0,
	shards: 'auto',
	ws: {
		intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MESSAGE_REACTIONS"]
	}
});

client.pVars = require('./passwords.js')

const pg = require('pg');
client.con = new pg.Pool({
	user: 'user',
	host: 'localhost',
	database: 'bot',
	password: client.pVars.dbPass,
	port: 5432
});



const { promisify } = require('util')
client.sleep = promisify(setTimeout)

const events = require('events');

	// --- Collection Lists ---

require('./methodsLoader.js')(client);

client.eventEm = new events.EventEmitter();

client.commands = new Discord.Collection(); // All userCommands Collection. Loaded from commands Folder
client.adminCommands = new Discord.Collection(); // All adminCommands Collection. Loaded from adminCommands Folder

client.votes = new Discord.Collection(); // All current votes in #voting
client.rules = new Discord.Collection(); // All voted rules and then there are core laws set by me for some order

client.jobList = new Discord.Collection(); // All jobs Collection. Loaded from database
client.highestJobRequirement = 0;

client.s = require('./info/settings.js')

	// --- Global variables ---

client.adminList = ['183617597365813248', '166063918979088384', '243842014976802816']; // List of super-admin IDs
client.botCount = 3 // Amount of bots in the server

client.allowCommands = true

client.cachedMoneyLB = {} // Cached Money ranked Leaderboard
client.cachedLevelLB = {} // Cached Level ranked Leaderboard
client.totalMoney = 0 // Total capital of the whole server

client.startUpTime = 0 // Time off the bot start

client.categoryList = []
client.adminCategoryList = []

client.guild = false

client.roleId = {
	admin: '802154205145464882',
	member: '802321291129651242',
	muted: '803682613377761305'
};

client.channelId = {
	commandChannels: [
		'801914747599061022', // Bot-Commands
		'881480417797083177',
		'884820035716120596', 
		'804277866790518804' //  Admin-Commands
		],
	voting: '801914827760205885',
	rules: '801916814501347329',
	errors: '842354024573566986'
};


// --- Load in commands and events ---

['commandLoader', 'eventLoader'].forEach(h => {
	require(`./loaders/${h}`)(client, Discord);
})

// --- Timed Functions ---

client.userCooldowns = {
	work: new Discord.Collection()
}

client.userTimersCooldown = {
	work: 2.5 * 60 * 1000 // 30min
}

client.leaderboardTimer = 0

const timers = require('./timers.js')
timers.leaderboard(client);

// --- Login bot ---

client.login(client.pVars.token) // Activate/Login the bot-commands
