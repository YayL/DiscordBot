module.exports = {
	name : "Admin",
	alias : ["a"],
	use: "-Admin",
	description : "Give author admin role",
	options: {ShowInHelp: false},
	run : function(msg, client, disc){
		msg.guild.roles.fetch(client.roleId.admin) // Get admin rank using its role id
			.then(role => {
				msg.member.roles.add(role);
			})
	}

}