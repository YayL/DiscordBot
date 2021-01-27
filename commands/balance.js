const m = require('./../methodsLoader.js');

module.exports = {
	name: "Balance",
	alias: ["bal"],
	use: "-Balance",
	description: "See your own balance",
	options: [true],
	users: [],
	run: async function(msg, client, disc){
		await m.data.getUserBalance(client, msg.author)
		.then(bal => {
			m.msg.reply(msg, "Balance",`*Your balance is:* **${bal}$**`, client, disc);
		})
	}
}