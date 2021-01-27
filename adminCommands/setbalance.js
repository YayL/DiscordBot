const m = require('./../methodsLoader.js');

module.exports = {
	name: "SetBalance",
	alias: ["sbal", "setbal"],
	use: "-SetBalance @[user] [amount]",
	description: "Set users bal",
	options: [true],
	users: [],
	run: function(msg, client, disc, args){
		const player = args[0];
		const amount = args[1];

		m.data.updateUserBalance(client, player, amount, "set");
	}
}