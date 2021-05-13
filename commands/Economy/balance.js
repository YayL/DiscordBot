module.exports = {
	name: "Balance",
	alias: ["bal"],
	use: "-Balance",
	description: "See your own balance",
	options: {ShowInHelp: true, Category: "Economy"},
	run: function(msg, client, disc){
		try{
			client.m.data.bal.getBalance(client, msg.author, "bal")
			.then(bal => {
				client.m.msg.reply(msg, "Balance",`*Your balance is:* **$${client.m.utils.numberWithCommas(bal)}**`, disc);
			});
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e)
		}
		
	}
}