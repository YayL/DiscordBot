module.exports = {
	name : "delAdmin",
	alias : ["da"],
	description : "Delete role admin from author",
	options: [false],
	users: ["183617597365813248"],
	run : function(msg, client, disc, args){
		msg.guild.roles.fetch(client.roleId.admin)
		.then(role => {
			msg.member.roles.remove(role)
			.catch(console.error);
		})
	}

}
