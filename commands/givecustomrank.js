module.exports = {
	name : "GiveCustomRank",
	alias : ["gcr", "givecr", "gcustomrank", "gcustomr", "gcrank"],
	use: "-GiveCustomRank [name] [color](Hex)",
	description : "Creates a new rank for you",
	options: [true],
	users: [],
	run : function(msg, client, disc, args){

		if(msg.member.roles.cache.array().length-1 <= client.settings.maxRanks || client.adminList.includes(msg.member.id)){

			if(msg.guild.roles.cache.find(role => role.name.toLowerCase() == args[0].toLowerCase())){return}

			const roleName = args[0];
			var roleColor = args[1];
			msg.guild.roles.create({
				data: {
					name: roleName
				}
			})
				.then(role => {
					role.setColor(roleColor).catch(console.error);
					role.setPosition(2);
					msg.member.roles.add(role);
				})
		}
	}
}
