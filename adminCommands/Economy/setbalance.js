module.exports = {
	name: "SetBalance",
	alias: ["sbal", "setbal"],
	use: "-SetBalance @[user] [amount]",
	description: "Set users bal",
	options: {ShowInHelp: false, Category: 'Economy'},
	run: function(client, msg, args, discord){
		try{
			if(!args[0]) return;

			if(args[0] == "me")
				return client._user.bal.addBalance(client, msg.author.id, args[1], true);
			
			client.utils.getMember(args[0], msg)
				.then(member => {
					if(member != null) return client._user.bal.addBalance(client, member.id, args[1], true);
				})
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
		
		
	}
}