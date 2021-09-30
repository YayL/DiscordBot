module.exports = {
	name: "GangInvite",
	alias: ['ginvite'],
	use: "-GangInvite @[user]",
	description: "Invite a user to your gang",
	options: {ShowInHelp: true, Category: "Gang"},
	run: async function(client, msg, args, discord){
		try{
			if(! await client.gang.user.inGang(client, msg.author.id)) 
				return client.eventEm.emit('notInAGang', msg);

			if(! await client.gang.permissions.isOwner(client, msg.author.id)) 
				return client.eventEm.emit('notGangOwner', msg);

			const user = msg.mentions.users.array()[0],
				gang = await client.gang.user.getGang(client, msg.author.id);

			if(user == undefined)
				return client.eventEm.emit('InvalidArgs', msg, this.use);

			if(await client.gang.user.inGang(client, user.id))
				return client.eventEm.emit('userAlreadyInGang', msg, user.displayName);

			if(client.gang.invite.isInvited(client, gang.info, user.id)) 
				return client.eventEm.emit('alreadyInvited', msg);

			client.eventEm.emit('GangInvite', msg, gang, user);
			client.gang.invite.addToInviteList(client, gang, user.id);
			
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e)
		}
		
	}
}