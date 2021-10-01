module.exports = (client, discord, msg) => {
    const embed = new discord.MessageEmbed()
        .setTitle('To do this, please remove your current listings first!')
        .setColor(client.s.COLOR_SCHEME['WARNING']);
        
    msg.channel.send(embed);
}