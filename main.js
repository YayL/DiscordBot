/* Changes for next Commit:
	1) Fixed so the law propositions last embed has the footer
	2) Added deleteLaw command
	3) Added a "website"
	4) Split the data modules up into 2 files 
	5) Added a leaderboard for server balance
	6) New error handling system through client.eventEm.emit()
	7) New help command for admins
	8) New filing for the commands
	9) Fixed customEvent loader
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
const client = new Discord.Client();

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

	// --- Global variables ---

client.adminList = ['183617597365813248']; // List of admin IDs
client.botCount = 2

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
		leaderboard: 5*60*1000
	}
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