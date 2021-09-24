module.exports = (client, discord, msg, setting, value) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`${setting} has been toggled ${value ? 'on' : 'off'}!`)
        .setColor('8d99b8');
    msg.channel.send(embed);
}