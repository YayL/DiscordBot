module.exports = {
	name : "DelAdmin",
	alias : ["da"],
	use: "-DelAdmin",
	description : "Delete role admin from author",
	options: {ShowInHelp: false, Category: 'Management'},
	run : function(msg, client, disc, args){
		try{
			msg.guild.roles.fetch(client.roleId.admin)
				.then(role => {
					msg.member.roles.remove(role)
					.catch(e => client.msg.log("ERR", e));
				})
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
		
	}

}
