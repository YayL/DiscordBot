const m = require("../../methodsLoader.js");

module.exports = {
	name: "Clear",
	alias: ["prune", "p", "c", "del"],
	use: "-Clear (amount)",
	description: "Remove a set amount of messages in current channel",
	options: {ShowInHelp: false},
	run: async function(msg, client, disc, args){
		m.utils.clearChat(msg, 1);
		var amount = 0
		amount = Number(args[0]);
		if(isNaN(amount)){return}
		while(amount > 100){
			try{
				await m.utils.clearChat(msg, 100);
				amount -= 100;
			}catch(e){break}
		}
		m.utils.clearChat(msg, amount);
	}
}