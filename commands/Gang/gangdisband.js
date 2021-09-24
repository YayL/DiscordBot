module.exports = {
	name: "GangDisband",
	alias: ['gdisband'],
	use: "-GangDisband",
	description: "Disband the guild you're a owner off",
	options: {ShowInHelp: true, Category: "Gang"},
	run: async function(client, msg, args, discord){
		try{
			const gang = await client.gang.user.getGang(client, msg.author.id);
			if(! await client.gang.user.inGang(client, msg.author.id, gang)) 
				return client.eventEm.emit('notInAGang', msg);

			if(! await client.gang.permissions.isOwner(client, msg.author.id)) 
				return client.eventEm.emit('notGangOwner', msg);

			client.gang.management.disbandGang(client, gang.name)

			client.eventEm.emit('disbandGang', msg, gang.info.NAME);
			
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}