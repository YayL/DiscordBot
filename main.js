// Current version: Gang Update 0.7
// Next Version: Listings & Limiteds Update 0.8

	/* Changes for next Commit:
	1) Added a -execute command which makes a user execute a command
	2) Added a -auction command that creates an auction
	3) Fixed an issue with the sell command that made it not possible to sell individual items by item_id
	4) Added an -auction command to add an auction
	5) Added an hasItem method to check if a user has an item and a specific amount of that item
	6) Changed how rules' ids are added
	7) Added a timeFormat that turns seconds into days, hours, minutes and seconds
	8) Added a -auctions command that can show users auctions, item auctions and tier auctions
	9) Added the possibility to purchase auctions through the -auctions command
	10) Fixed so that the help menu disappeares after the timer is done
	11) Increased help timer by 10seconds
	12) Renamed auction commands to -list and -listings to be more fitting
	13) When a user rebirths they must now not have any listings open
	14) Added so the -reset command removes all user listings
	15) Total fixup and refactoring of all files other than the commandBin folder
	16) Added a -suicide command so people can reset their players completetely
	17) 

    TODO NEXT:
	1) Add a timer that every 5 minutes checks the listings with the lowest deadline if they have expiered and removes them
	2) Add a command like -mylistings to be able to take down your listings
	3) Add limited items


	TODO Before full release:
	1) Add more than 50 items
	2) Add benefits of being in a gang
	3) Add gang upgrades
	4) Add gang leaderboards

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

// TODO: Save config directly to client?
// TODO: Switch config to TOML for comments/structure
// TODO: Standardize quotes, indentation, etc. (Create style guide)
const botConfig = require("./botConfig.json");
client.pVars = require('./passwords.json');

const pg = require('pg');
client.con = new pg.Pool({
	user: client.pVars.dbUser,
	host: client.pVars.dbHost,
	database: client.pVars.dbName,
	password: client.pVars.dbPass,
	port: client.pVars.dbPort
});

const { promisify } = require('util');
client.sleep = promisify(setTimeout);

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

client.s = require('./info/settings.js');

// --- Global variables ---

// TODO: client.botConfig?
client.adminList = botConfig.adminList; // List of super-admin IDs
client.botCount = botConfig.botCount; // Amount of bots in the server, TODO: Get dynamically?

client.allowCommands = true;

client.cachedMoneyLB = {}; // Cached Money ranked Leaderboard
client.cachedLevelLB = {}; // Cached Level ranked Leaderboard
client.totalMoney = 0; // Total capital of the whole server

client.startUpTime = 0; // Time off the bot start

client.categoryList = [];
client.adminCategoryList = [];

client.guild = false;

// TODO: client.botConfig?
client.roleId = botConfig.roleId;
client.channelId = botConfig.channelId;

// --- Load in commands and events ---

['commandLoader', 'eventLoader'].forEach(h => {
	require(`./loaders/${h}`)(client, Discord);
});

// --- Timed Functions ---

client.userCooldowns = {
	work: new Discord.Collection()
};

// TODO: Config?
client.userTimersCooldown = {
	work: 2.5 * 60 * 1000 // 30min
};

client.leaderboardTimer = 0;

const timers = require('./timers.js');
timers.leaderboard(client);

// --- Login bot ---

client.login(client.pVars.token); // Activate/Login the bot-commands
