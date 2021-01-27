module.exports = {
	name : "Admin",
	alias : ["a"],
	description : "Give author admin role",
	options: [false],
	users: ["183617597365813248"],
	run : function(msg, client, disc){
		msg.guild.roles.fetch(client.roleId.admin) // Get admin rank using its role id
			.then(role => {
				msg.member.roles.add(role);
			})
	}

}