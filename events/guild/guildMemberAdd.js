const func = require('./../../customMethods.js');

module.exports = (disc, client, member) => {
	console.log(1);
	member.guild.roles.fetch('802321291129651242')
	.then(role => {
		member.roles.add(role);
	})
}