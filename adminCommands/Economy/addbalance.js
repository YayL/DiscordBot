module.exports = {
	name: "AddBalance",
	alias: ["abal", "addbal"],
	use: "-AddBalance @[user] [amount]",
	description: "Add to users bal",
	options: {ShowInHelp: false, Category: 'Economy'},
	run: function(client, msg, args, discord){
		try{
			if(!args[0]) return;
			
			if(args[0] == "me")
				return client._user.bal.addBalance(client, msg.author.id, args[1]);

			client.utils.getMember(args[0], msg)
				.then(member => {
					if(member != null) 
						return client._user.bal.addBalance(client, member.id, args[1]);
				});
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}