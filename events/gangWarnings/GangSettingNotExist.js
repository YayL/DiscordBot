module.exports = (client, discord, msg, setting) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`${setting} is not a valid gang setting.`)
        .setColor('a86b2f');
    msg.channel.send(embed);
}