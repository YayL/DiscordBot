module.exports = (client, discord, msg, user) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`You and ${user.displayName} are not in the same gang!`)
        .setColor(client.s.COLOR_SCHEME['GANGWARNING']);
    msg.channel.send(embed);
}