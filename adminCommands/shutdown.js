const m = require("../methodsLoader.js")

function beforeExit(msg){
	m.utils.clearChat(msg, "all", m.utils.getChannel(msg, client.channelId.voting))
}

module.exports = {
	name: "Shutdown",
	alias : ["s", "shut", "sd"],
	description: "Turns off the bot correctly",
	options: [false],
	users: ["183617597365813248"],
	run : function(msg, client, disc){
		try{
			beforeExit(msg);
		}catch(e){console.log(e)}
	}
}