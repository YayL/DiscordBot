const func = require("../customMethods.js");

module.exports = {
	name: "clear",
	alias: ["prune", "p", "c", "del"],
	description: "Remove a set amount of messages (ALL=All messages younger than 2 weeks)",
	options: [false],
	users: ["183617597365813248"],
	run: function(msg, args, client, disc){
		var amount = 0
		try{
			amount = Number(args[0]);
			if(isNaN(amount)){
				amount = args[0].toLowerCase();
			}
		}catch(e){
			console.log(e)
		}
		func.clearChat(msg, amount);
	}
}