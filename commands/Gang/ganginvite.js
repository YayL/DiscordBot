module.exports = {
	name: "GangInvite",
	alias: ['ginvite'],
	use: "-GangInvite @[user]",
	description: "Invite a user to your gang",
	options: {ShowInHelp: true, Category: "Gang"},
	run: async function(msg, client, disc, args){
		try{
			// Is not in a gang
			if(!(await client._user.gang.inGang(client, msg.author.id))) return client.eventEm.emit('notInAGang', msg);
			// Is not the Owner
			if(!(await client.data.gang.isOwner(client, msg.author.id))) return client.eventEm.emit('notGangOwner', msg);

			const user = await client.utils.getMember(args[0], msg)

			if(await client._user.gang.inGang(client, user.id)) return client.eventEm.emit('userAlreadyInGang', msg, user.displayName)

			const gang = await client._user.gang.getGang(client, msg.author.id)

			if(!JSON.parse(gang.info).SETTINGS['INVITE_ONLY']) return client.eventEm.emit('NotInviteOnly', msg)
			if(client.data.gang.isInvited(client, JSON.parse(gang.info), user.id)) return client.eventEm.emit('alreadyInvited', msg)


			client.data.gang.addToInviteList(client, gang, user.id)
			
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e)
		}
		
	}
}