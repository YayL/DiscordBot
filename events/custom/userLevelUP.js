module.exports = (client, discord, msg, plr, xp_amount) => {

    const embed = new discord.MessageEmbed()
        .setTitle('Level UP!')
        .addField(`${plr.displayName} leveled up!`, `Congratulations on becoming level ${client.m.data.jobs.xpToLevel(xp_amount)}`)
        .setColor('#dde026')
        .setFooter('Keep going! You are doing great!');

    msg.channel.send(embed);
}