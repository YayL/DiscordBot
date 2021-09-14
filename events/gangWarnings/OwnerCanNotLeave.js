module.exports = (client, discord, msg) => {

	const embed = new discord.MessageEmbed()
		.setTitle('The owner is not allowed to leave their gang')
		.setDescription(`You can try disbanding the gang or transfering the ownership`)
		.setColor('a86b2f');
	msg.channel.send(embed);
}