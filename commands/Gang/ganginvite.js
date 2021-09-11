module.exports = {
	name: "GangInvite",
	alias: ['ginvite'],
	use: "-GangInvite @[user]",
	description: "Invite a user to your gang",
	options: {ShowInHelp: true, Category: "Gang"},
	run: async function(msg, client, disc, args){
		try{
			if(! await client._user.gang.inGang(client, msg.author.id)) 
				return client.eventEm.emit('notInAGang', msg);

			if(! await client.data.gang.isOwner(client, msg.author.id)) 
				return client.eventEm.emit('notGangOwner', msg);

			const user = await client.utils.getMember(args[0], msg),
				gang = await client._user.gang.getGang(client, msg.author.id);

			if(await client._user.gang.inGang(client, user.id))
				return client.eventEm.emit('userAlreadyInGang', msg, user.displayName);

			if(! gang.info.SETTINGS['INVITE_ONLY']) 
				return client.eventEm.emit('NotInviteOnly', msg);

			if(client.data.gang.isInvited(client, gang.info, user.id)) 
				return client.eventEm.emit('alreadyInvited', msg);


			client.data.gang.addToInviteList(client, gang, user.id);
			
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e)
		}
		
	}
}