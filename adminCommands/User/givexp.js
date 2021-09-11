module.exports = {
	name: "GiveXP",
	alias: ["xp"],
	use: "-GiveXP @[user] [amount]",
	description: "Give a user some amount of xp",
	options: {ShowInHelp: false, Category: 'User'},
	run: function(msg, client, disc, args){
		try{
			let amount = client.utils.suffixCheck(args[1], true);
			if(!amount) return;
			
			if(args[0] == "me"){
				return client._user.xp.addXP(client, msg, msg.member.id, amount, false);
			}
			client.utils.getMember(args[0], msg)
				.then(member => {
					if(member != null) 
						return client._user.xp.addXP(client, msg, member.id, amount, false);
				})
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
		
	}
}