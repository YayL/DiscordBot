module.exports = (client, discord, msg) => {
	const embed = new discord.MessageEmbed()
		.setTitle('You took the easy way out')
		.setColor('a86b2f');
		
	msg.channel.send(embed);
}