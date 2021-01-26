module.exports = {
	name : "Member",
	alias : ["m"],
	use: "-Member",
	description : "Give yourself the member rank if you for some reason don't have it",
	options: [true],
	users: [],
	run : function(msg, client, disc){

		msg.guild.roles.fetch(client.roleId.member) // Get member rank using its role id
			.then(role => {
				msg.member.roles.add(role);
			})
	}
}

