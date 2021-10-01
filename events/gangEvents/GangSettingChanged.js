module.exports = (client, discord, msg, setting, value) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`${setting} has been toggled ${value ? 'on' : 'off'}!`)
        .setColor(client.s.COLOR_SCHEME['GANG']);
    msg.channel.send(embed);
}