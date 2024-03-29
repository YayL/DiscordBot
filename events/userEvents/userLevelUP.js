module.exports = async (client, discord, channel, user_id, xp_amount, previous_xp) => {

    const lvl = await client.data.jobs.expToLevel(xp_amount),
        user = await client.utils.getMember(user_id, channel),
        embed = new discord.MessageEmbed()
        .setTitle('Level UP!')
        .addField(`${user.displayName} leveled up!`, `Congratulations on reaching level ${lvl}`)
        .setColor(client.s.COLOR_SCHEME['USER'])
        .setFooter('Keep going! You are doing great!');

    if(lvl <= await client.data.jobs.expToLevel(previous_xp))
        return;

    channel.send(embed);

    client.eventEm.emit('achivementEarned', channel, user, client.achivementList.find(element => element.id == `L${lvl}`));
}