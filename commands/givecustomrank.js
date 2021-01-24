module.exports = {
	name : "GiveCustomRank",
	alias : ["gcr", "givecr", "gcustomrank", "gcustomr", "gcrank"],
	use: "-GiveCustomRank [name(OneWord)] [color(HexFormat)]",
	description : "Creates a new rank for you",
	options: [true],
	users: [],
	run : function(msg, args, client, disc){
		if(msg.member.roles.cache.array().length-1 <= 2 || client.adminList.includes(msg.member.id)){
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
