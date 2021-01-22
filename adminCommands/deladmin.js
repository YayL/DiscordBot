module.exports = {
	name : "delAdmin",
	alias : ["da"],
	description : "Delete role admin from author",
	options: [false],
	users: ["183617597365813248"],
	run : function(msg, client, cmds, disc, args){
		msg.guild.roles.fetch('802154205145464882')
		.then(role => {
			msg.member.roles.remove(role)
			.catch(console.error);
		})
	}

}