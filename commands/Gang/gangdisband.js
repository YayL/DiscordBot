module.exports = {
	name: "GangDisband",
	alias: ['gdisband'],
	use: "-GangDisband",
	description: "Disband the guild you're a owner off",
	options: {ShowInHelp: true, Category: "Gang"},
	run: async function(msg, client, disc, args){
		try{

			if(! await client._user.gang.inGang(client, msg.author.id)) 
				return client.eventEm.emit('notInAGang', msg);

			if(! await client.data.gang.isOwner(client, msg.author.id)) 
				return client.eventEm.emit('notGangOwner', msg);
			
			const gang = await client._user.gang.getGang(client, msg.author.id);
			const members = gang.members;

			for(member_id of members){
				client._user.gang.leaveGang(client, member_id, true);
			}

			client.con.query(`DELETE FROM gangs WHERE name = '${gang.name}'`);
			client.eventEm.emit('disbandGang', msg, gang.info.NAME);
			
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}