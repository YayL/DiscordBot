module.exports = {
	name: "Clear",
	alias: ["prune", "c"],
	use: "-Clear (amount)",
	description: "Remove a set amount of messages in current channel",
	options: {ShowInHelp: false},
	run: async function(msg, client, disc, args){
		try{
			var amount = Number(args[0]) +1;
			if(isNaN(amount) || amount<1) return
			while(amount > 100){
				try{
					await client.utils.clearChat(msg, 100);
					amount -= 100;
				}catch(e){break}
			}
			client.utils.clearChat(msg, amount);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
		
	}
}