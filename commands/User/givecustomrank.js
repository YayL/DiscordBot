module.exports = {
	name : "GiveCustomRank",
	alias : ["gcr", "givecr", "gcustomrank", "gcustomr", "gcrank"],
	use: "-GiveCustomRank (name) (hex-color)",
	description : "Creates a new rank with custom color for you",
	options: {ShowInHelp: true, Category: "User"},
	run : function(msg, client, disc, args){

		if(msg.member.roles.cache.array().length-1 <= client.settings.maxRanks || client.adminList.includes(msg.member.id)){

			if(msg.guild.roles.cache.find(role => role.name.toLowerCase() == args[0].toLowerCase())){return}

			[roleName, args] = client.m.utils.argsWithSpace(args);
			var roleColor = args[0];
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
