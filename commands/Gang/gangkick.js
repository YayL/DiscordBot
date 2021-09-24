module.exports = {
	name: "GangKick",
	alias: ['gkick'],
	use: "-GangKick @[user]",
	description: "Kick a user from the guild you own",
	options: {ShowInHelp: true, Category: "Gang"},
	run: async function(client, msg, args, discord){
		try{
			const gang = await client.gang.user.getGang(client, msg.author.id);

			if(! await client.gang.user.inGang(client, msg.author.id, gang)) 
				return client.eventEm.emit('notInAGang', msg);

			if(! await client.gang.permissions.isOwner(client, msg.author.id)) 
				return client.eventEm.emit('notGangOwner', msg);

            if(msg.mentions.users.array().length == 0)
                return client.eventEm.emit('InvalidArgs', msg, this.use);
            
            const member = msg.mentions.users.array()[0];

            if(gang.name != (await client.gang.user.getGang(client, member.id)).name)
                return client.eventEm.emit('NotInTheSameGang', msg, member);

            if(await client.gang.permissions.isOwner(client, member.id))
                return client.eventEm.emit('IsOwner', msg);

            client.gang.user.leaveGang(client, member.id);
			
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}