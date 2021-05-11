module.exports = async (client, discord, channel, user, xp_amount) => {

	const embed = new discord.MessageEmbed()
        .setTitle('Level UP!')
        .addField(`${user.displayName} leveled up!`, `Congratulations on becoming level ${client.m.data.jobs.xpToLevel(xp_amount)}`)
        .setColor('#dde026')
        .setFooter('Keep going! You are doing great!');

    channel.send(embed);

	client.eventEm.emit('achivementEarned', channel, user, client.achivementList.find(element => element.id == `L${client.m.data.jobs.xpToLevel(xp_amount)}`));
}