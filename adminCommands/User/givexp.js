module.exports = {
	name: "GiveXP",
	alias: ["xp"],
	use: "-GiveXP @[user] [amount]",
	description: "Give a user some amount of xp",
	options: {ShowInHelp: false},
	run: function(msg, client, disc, args){
		try{
			let amount = client.utils.suffixCheck(args[1], true)
			if(!amount) return;
			
			if(args[0] == "me"){
				return client.data.user.addXP(client, msg, msg.member, amount, false);
			}
			client.utils.getMember(args[0], msg)
			.then(member => {
				return client.data.user.addXP(client, msg, member, amount, false);
			}).catch(e => {
				client.eventEm.emit('CommandError', msg, this.name, args, e)
			})
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
		
	}
}