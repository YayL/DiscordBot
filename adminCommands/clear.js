const m = require("../methodsLoader.js");

module.exports = {
	name: "clear",
	alias: ["prune", "p", "c", "del"],
	use: "-Clear (amount)",
	description: "Remove a set amount of messages in current channel",
	options: {ShowInHelp: false},
	run: function(msg, client, disc, args){
		var amount = 0
		amount = Number(args[0]);
		if(isNaN(amount)){
			amount = args[0].toLowerCase();
		}
		while(amount > 100){
			m.utils.clearChat(msg, 100);
			amount -= 100;
		}
		m.utils.clearChat(msg, amount);
	}
}