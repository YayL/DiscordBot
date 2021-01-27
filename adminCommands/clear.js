const m = require("../methodsLoader.js");

module.exports = {
	name: "clear",
	alias: ["prune", "p", "c", "del"],
	description: "Remove a set amount of messages",
	options: [false],
	users: ["183617597365813248"],
	run: function(msg, client, disc, args){
		var amount = 0
		try{
			amount = Number(args[0]);
			if(isNaN(amount)){
				amount = args[0].toLowerCase();
			}
		}catch(e){
			console.log(e)
		}
		try{
			while(amount > 100){
				m.utils.clearChat(msg, 100);
				amount -= 100;
			}
			m.utils.clearChat(msg, amount);
		}catch(e){return}
	}
}