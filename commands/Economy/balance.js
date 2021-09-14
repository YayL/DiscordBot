module.exports = {
	name: "Balance",
	alias: ["bal"],
	use: "-Balance",
	description: "See your own balance",
	options: {ShowInHelp: true, Category: "Economy"},
	run: function(client, msg, args, discord){
		var formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		});

		try{
			client._user.bal.getBalance(client, msg.author.id, "bal")
				.then(bal => {
					var extra = '';
					if(bal > 1e5) 
						extra = `\n*More precisely:* **${formatter.format(bal)}**`;
					client.msg.reply(msg, "Balance",`*Your balance is:* **$${client.utils.fixNumber(bal, true)}**`+extra, discord);
				});
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}
