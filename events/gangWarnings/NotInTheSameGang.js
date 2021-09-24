module.exports = (client, discord, msg, user) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`You and ${user.displayName} are not in the same gang!`)
        .setColor('a86b2f');
    msg.channel.send(embed);
}