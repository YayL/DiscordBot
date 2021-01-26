const func = require("../customMethods.js")

function beforeExit(msg){
	const channel = msg.guild.channels.cache.get('801914827760205885');
	func.clearChat(msg, "all", channel)
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