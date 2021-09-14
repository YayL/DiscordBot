module.exports = (client, discord, msg, listing) => {
	const embed = new discord.MessageEmbed()
		.setTitle(`This listing expired ${client.utils.timeFormat(Math.ceil(Date.now()/1000) - listing.deadline)} ago`)
		.setColor('a86b2f');
		
	msg.channel.send(embed);
}