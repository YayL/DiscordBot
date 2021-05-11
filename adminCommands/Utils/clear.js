const m = require("../../methodsLoader.js");

module.exports = {
	name: "Clear",
	alias: ["prune", "c"],
	use: "-Clear (amount)",
	description: "Remove a set amount of messages in current channel",
	options: {ShowInHelp: false},
	run: async function(msg, client, disc, args){
		var amount = Number(args[0]) +1;
		if(isNaN(amount) || amount<1){return}
		while(amount > 100){
			try{
				await m.utils.clearChat(msg, 100);
				amount -= 100;
			}catch(e){break}
		}
		m.utils.clearChat(msg, amount);
	}
}