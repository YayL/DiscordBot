module.exports = {
	name: "reset",
	alias: [],
	use: "-reset @[user]",
	description: "Reset a users data",
	options: {ShowInHelp: false},
	run: function(msg, client, disc, args){
		try{
			if(!args[0]) return

			if(args[0] == "me"){
				return client.m.data.user.resetUser(client, msg.member)
			}

			client.m.utils.getMember(args[0], msg)
			.then(member => {
				return client.m.data.user.resetUser(client, member)
			}).catch(e => {
				client.eventEm.emit('CommandError', msg, this.name, args, e)
			});
			
			
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
		
	}
}