module.exports = {
	name: "GangLeave",
	alias: ['gleave'],
	use: "-GangLeave",
	description: "Leave the current guild you're in",
	options: {ShowInHelp: true, Category: "Gang"},
	run: async function(client, msg, args, discord){
		try{
			// Is not already in a guild
			if(!(await client.gang.user.inGang(client, msg.author.id))) 
				return client.eventEm.emit('notInAGang', msg);
			
			if(await client.gang.permissions.isOwner(client, msg.author.id)) 
				return client.eventEm.emit('OwnerCanNotLeave', msg);

			client.gang.user.leaveGang(client, msg.author.id);
			client.eventEm.emit('leftGang', msg);
			
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}