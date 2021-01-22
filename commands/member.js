module.exports = {
	name : "Member",
	alias : ["m"],
	description : "Give yourself the member rank if you for some reason don't have it",
	options: [true],
	users: [],
	run : function(msg, args, client, disc){

		msg.guild.roles.fetch('801914910845042689') // Get member rank using its role id
			.then(role => {
				msg.member.roles.add(role);
			})
	}

}