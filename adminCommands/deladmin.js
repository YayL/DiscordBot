module.exports = {
	name : "DelAdmin",
	alias : ["da"],
	use: "-DelAdmin",
	description : "Delete role admin from author",
	options: {ShowInHelp: false},
	run : function(msg, client, disc, args){
		msg.guild.roles.fetch(client.roleId.admin)
		.then(role => {
			msg.member.roles.remove(role)
			.catch(console.error);
		})
	}

}
