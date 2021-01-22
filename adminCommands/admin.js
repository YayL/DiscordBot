let func = require("../customMethods.js");

module.exports = {
	name : "Admin",
	alias : ["a"],
	description : "Give author admin role",
	options: [false],
	users: ["183617597365813248"],
	run : function(msg, client, cmds, disc, args){
		msg.guild.roles.fetch('802154205145464882')
		.then(role => {
			func.giveRole(msg.member, role);
		})
	}

}