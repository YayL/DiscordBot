module.exports = (client, discord, msg) => {
    const embed = new discord.MessageEmbed()
        .setTitle('You took the easy way out')
        .setColor(client.s.COLOR_SCHEME['USER']);
        
    msg.channel.send(embed);
}