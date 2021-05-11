const m = require("../../methodsLoader.js")

async function beforeExit(msg, client){
	m.utils.clearChat(msg, 100, client.channelId.voting)
	.then(() => {
		client.sleep(3500).then(() => {//Time might need to be increased if we add more stuff for it to do before it turns off
			client.destroy();
			process.exit(1);
	})
	})
}

module.exports = {
	name: "Shutdown",
	alias : ["s", "shut", "sd"],
	use: "-Shutdown",
	description: "Turns off the bot correctly",
	options: {ShowInHelp: false},
	run : function(msg, client, disc){
		m.utils.clearChat(msg, 1);
		beforeExit(msg, client);
	}
}