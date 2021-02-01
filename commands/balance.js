const m = require('./../methodsLoader.js');

module.exports = {
	name: "Balance",
	alias: ["bal"],
	use: "-Balance",
	description: "See your own balance",
	options: {ShowInHelp: true, Category: "Economy"},
	run: function(msg, client, disc){
		m.data.getBalance(client, msg.author, "bal")
		.then(bal => {
			m.msg.reply(msg, "Balance",`*Your balance is:* **$${m.utils.numberWithCommas(bal)}**`, client, disc);
		})
	}
}