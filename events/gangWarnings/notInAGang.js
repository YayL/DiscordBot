module.exports = (client, discord, msg) => {

	const embed = new discord.MessageEmbed()
		.setTitle('You do not appear to be apart of a gang')
		.setDescription(`Join a gang first and try again later`)
		.setColor('a86b2f');
	msg.channel.send(embed);
}