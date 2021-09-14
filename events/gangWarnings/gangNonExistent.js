module.exports = (client, discord, msg, name) => {

	const embed = new discord.MessageEmbed()
		.setTitle('Specified gang does not exist')
		.setDescription(`The gang: ${name} does not appear to be an existing gang`)
		.setColor('a86b2f');
	msg.channel.send(embed);
}