module.exports = {
	name : "Member",
	alias : ["m"],
	use: "-Member",
	description : "Give yourself the member rank if you for some reason don't have it",
	options: [true],
	users: [],
	run : function(msg, args, client, disc){

		msg.guild.roles.fetch('802321291129651242') // Get member rank using its role id
			.then(role => {
				msg.member.roles.add(role);
			})
	}

