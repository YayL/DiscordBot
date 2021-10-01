module.exports = (client, discord, msg, setting) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`${setting} is not a valid gang setting.`)
        .setColor(client.s.COLOR_SCHEME['GANGWARNING']);
    msg.channel.send(embed);
}