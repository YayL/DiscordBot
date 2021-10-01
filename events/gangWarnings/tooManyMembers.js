module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle('This gang is already full')
        .setColor(client.s.COLOR_SCHEME['GANGWARNING']);
    msg.channel.send(embed);
}