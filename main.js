	/* Changes for next Commit:
    15) Added a lootbox system which currently supports a few boxes with some items. Will increase item amount
    16) Got rid of the .m in the using of modules
    17) Lootboxes now tell you everything you got and some info about the item
    18) Changed the xp curve once again to be MUCH easier
    19) Fixed some bugs with xp giving making the level up message appear everytime.
    20) Fixed some issues with the -profile command
    21) Fixed reset command not accuratly reseting money balance
    22) Added limited item tier
    23) Fixed issue with setting balance to 0
    24) Fixed issue with -balance showing undefined if money wasn't abow 100k
    25) Added a new category of commands "Items"
    26) Added info command to lookup some info about an item
    27) Removed -info and -i as aliases for the -help command
    28) Added a -give command to give a user a certain item
    29) Added a InvalidArgs warning event
    30) Fixed some issues with giving items
    31) Fixed an issue with resetting
    32) Fixed an issue with new players being given incorrect values
    33) Added money suffix to not enough money message

    TODO NEXT:
    0) Add a inventory command - DONE
    1) Add saving of items in database using JSON - DONE
    2) Add give item commands - DONE
    3) Add items being given to the player after lootbox opened - DONE
	4) Fix money not being taken from player after purchasing lootbox - FIXED
	5) Fix lootboxing continuing even íf player doesn't have enough money - FIXED

*/
/*
	TODO Before release:
	1) Finish the website -- CONSIDERING
	2) Add API support to the website -- DEPENDENT
	3) Add more to the economy branch -- WORKING ON
	5) Add a guild/crew System.
	6) Add lootboxes - DONE
	7) Add an auction house and a market to sell loot to NPC
	8) Add money AND xp/level leaderboard -- DONE
	9) Add a job-tree or something - CONSIDERING
	10) Add a command to look through all jobs and see if any are not linked up to any previous jobs -- DONE

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

require('./methodsLoader.js')(client);

client.eventEm = new events.EventEmitter();

client.commands = new Discord.Collection(); // All userCommands Collection. Loaded from commands Folder
client.adminCommands = new Discord.Collection(); // All adminCommands Collection. Loaded from adminCommands Folder

client.votes = new Discord.Collection(); // All current votes in #voting
client.rules = new Discord.Collection(); // All voted rules and then there are core laws set by me for some order

client.jobList = new Discord.Collection(); // All jobs Collection. Loaded from database
client.highestJobRequirement = 0;

client.achivementList = require('./info/Achivements.js')
client.items = require('./info/Items.js')

client.s = require('./info/settings.js')

	// --- Global variables ---

client.adminList = ['183617597365813248', '813580267277123615']; // List of super-admin IDs
client.botCount = 3 // Amount of bots in the server

client.cachedMoneyLB = {} // Cached Money ranked Leaderboard
client.cachedLevelLB = {} // Cached Level ranked Leaderboard
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
