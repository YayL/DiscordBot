module.exports = {
	name : "Suicide",
	alias : [],
	use: "-Suicide",
	description : "Start a new life",
	options: {ShowInHelp: true, Category: "User"},
	run : async function(client, msg, args, discord){
		try{
			if(await client.data.market.getUserCount(client, msg.author.id) > 0) 
				return client.eventEm.emit('HasOpenListings', msg);

			client._user.resetUser(client, msg.author.id, false, true);
            client.eventEm.emit('suicide', msg);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }
}

