module.exports = (client, discord, msg) => {
    const embed = new discord.MessageEmbed()
        .setTitle('You have too many listings open, remove some and try again!')
        .setColor(client.s.COLOR_SCHEME['WARNING']);
        
    msg.channel.send(embed);
}