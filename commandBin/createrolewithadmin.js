module.exports = {
	name : "CreateRoleWithAdmin",
	alias : ["admin"],
	description : "Creates a role with admin permissions",
	run : function(msg, client, cmds, disc, args){
		msg.guild.roles.create({
			data: {
				name: "ADMIN"
			}
		})
			.then(role => {
				role.setPermissions(['ADMINISTRATOR']);
				msg.member.roles.add(role);
			})
			.catch(console.error);
	}

}