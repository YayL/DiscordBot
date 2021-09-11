module.exports = {
	name: "GangLeave",
	alias: ['gleave'],
	use: "-GangLeave",
	description: "Leave the current guild you're in",
	options: {ShowInHelp: true, Category: "Gang"},
	run: async function(msg, client, disc, args){
		try{
			// Is not already in a guild
			if(!(await client._user.gang.inGang(client, msg.author.id))) 
				return client.eventEm.emit('notInAGang', msg);
			
			if(await client.data.gang.isOwner(client, msg.author.id)) 
				return client.eventEm.emit('OwnerCanNotLeave', msg);

			client._user.gang.leaveGang(client, msg.author.id);
			client.eventEm.emit('leftGang', msg);
			
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}