module.exports = {
	name: "SetBalance",
	alias: ["sbal", "setbal"],
	use: "-SetBalance @[user] [amount]",
	description: "Set users bal",
	options: {ShowInHelp: false},
	run: function(msg, client, disc, args){
		try{
			if(!args[0]) return;
			if(args[0] == "me"){
				return client.data.user.addBalance(client, msg.author, args[1], "set");
			}
			client.utils.getMember(args[0], msg)
			.then(member => {
				return client.data.user.addBalance(client, member, args[1], "set");
			})
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
		
		
	}
}