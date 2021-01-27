module.exports = (client, disc, member) => {
	console.log(1);
	member.guild.roles.fetch(client.roleId.member)
	.then(role => {
		member.roles.add(role);
	})
}