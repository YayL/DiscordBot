module.exports = {
	name : "delAdmin",
	alias : ["da"],
	description : "Delete role admin from author",
	options: [false],
	users: ["183617597365813248"],
	run : function(msg, args, client, disc){
		if (args[0] === "m"){
			msg.guild.roles.fetch('802321291129651242')
			.then(role => {
				msg.member.roles.remove(role)
				.catch(console.error);
			})
		}else{
			msg.guild.roles.fetch('802154205145464882')
			.then(role => {
			msg.member.roles.remove(role)
			.catch(console.error);
			})
		}
	}

}