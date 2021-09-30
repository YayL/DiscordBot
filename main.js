// Current version: Market Update 0.8.5
// Next Version: Gang Expension and Item Update 0.9

/* Changes for next Commit:
    

	KNOWN BUGS:
	
	

    TODO NEXT:
	1) Add limited items
	2) Add gang updates
		- Gang can upgrade members to premium ranks using gang tokens
		- Gang tokens: Earned through leveling the gang
	3) Add a slots and roulett command


	TODO Before full release:
	1) Add more than 100 items
	4) Add gang ranks that can be created, removed, given and changed
	7) 

*/

// --- Setup stuff ---

const Discord = require('discord.js'); // Getting discord module
const client = new Discord.Client({
    restTimeOffset: 0,
    shards: "auto",
    ws: {
        intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MESSAGE_REACTIONS"]
    }
});

// TODO: Save config directly to client?
// TODO: Switch config to TOML for comments/structure
// TODO: Standardize quotes, indentation, etc. (Create style guide)

const botConfig = require("./botConfig.json");
const pVars = require('./passwords.json');

const pg = require('pg');
client.con = new pg.Pool({
    user: pVars.dbUser,
    host: pVars.dbHost,
    database: pVars.dbName,
    password: pVars.dbPass,
    port: pVars.dbPort
});

const { promisify } = require('util');
client.sleep = promisify(setTimeout);

const events = require('events');

// --- Collection Lists ---

require('./methodsLoader.js')(client);
client.msg._initLog();

client.eventEm = new events.EventEmitter();

client.commands = new Discord.Collection(); // All userCommands Collection. Loaded from commands Folder
client.adminCommands = new Discord.Collection(); // All adminCommands Collection. Loaded from adminCommands Folder
client.commandsCategories = {};
client.adminCommandsCategories = {};

client.votes = new Discord.Collection(); // All current votes in #voting
client.rules = new Discord.Collection(); // All voted rules and then there are core laws set by me for some order

client.jobList = new Discord.Collection(); // All jobs Collection. Loaded from database
client.highestJobRequirement = 0;

client.s = require('./info/settings.js');

// --- Global variables ---

// TODO: client.botConfig?
client.adminList = botConfig.adminList; // List of super-admin IDs
client.allowedBotList = botConfig.allowedBotList;
client.botCount = botConfig.botCount; // Amount of bots in the server, TODO: Get dynamically?

client.allowCommands = true;

client.cachedMoneyLB = []; // Cached Money ranked Leaderboard
client.cachedLevelLB = []; // Cached Level ranked Leaderboard
client.cachedRebirthLB = []; // Cached rebirth ranked Leaderboard
client.cachedGangLB = []; // Cached gang ranked Leaderboard
client.totalMoney = 0; // Total capital of the whole server

client.userCache = {}; // A cache of all user data
client.gangCache = {};

client.startUpTime = 0; // Time off the bot start

client.categoryList = [];
client.adminCategoryList = [];

client.guild = false;

// TODO: client.botConfig?
client.roleId = botConfig.roleId;
client.channelId = botConfig.channelId;
client.roleStats = botConfig.roleStats;

// --- Load in commands and events ---

['commandLoader', 'eventLoader'].forEach(h => {
    require(`./loaders/${h}`)(client, Discord);
});

// --- Timed Functions ---

client.userCooldowns = {
    work: [new Discord.Collection(), 1.5 * 60 * 1000],
    lootbox: [new Discord.Collection(), 2 * 1000],
    steal: [new Discord.Collection(), 15 * 60 * 1000],
    pay: [new Discord.Collection(), 30 * 60 * 1000],
    bank: [new Discord.Collection(), 30 * 60 * 1000]
};

client.leaderboardTimer = 0;

const timers = require('./timers.js');
timers.leaderboard(client);
timers.market(client);

// --- Login bot ---

client.login(pVars.token);