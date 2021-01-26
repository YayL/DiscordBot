let func = require("../customMethods.js");

module.exports = {
	name : "Admin",
	alias : ["a"],
	description : "Give author admin role",
	options: [false],
	users: ["183617597365813248"],
	run : function(msg, client, disc){
		msg.guild.roles.fetch(client.roleId.admin)
		.then(role => {
			func.giveRole(msg.member, role);
		})
	}

}