module.exports = (client, discord, msg) => {
    const embed = new discord.MessageEmbed()
        .setTitle('You are not allowed to buy your own listing!')
        .setColor(client.s.COLOR_SCHEME['WARNING']);
        
    msg.channel.send(embed);
}
