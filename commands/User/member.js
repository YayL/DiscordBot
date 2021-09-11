module.exports = {
	name : "Member",
	alias : ["m"],
	use: "-Member",
	description : "Give yourself the member rank if you for some reason don't have it",
	options: {ShowInHelp: true, Category: "User"},
	run : function(msg, client, disc){
		try{
			msg.guild.roles.fetch(client.roleId.member) // Get member rank using its role id
				.then(role => {
					msg.member.roles.add(role);
				});
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
		
	}
}

