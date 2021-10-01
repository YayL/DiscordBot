module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle('You can not do this to yourself')
        .setColor(client.s.COLOR_SCHEME['WARNING']);
        
    msg.channel.send(embed);
}