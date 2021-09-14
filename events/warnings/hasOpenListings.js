module.exports = (client, discord, msg) => {
    const embed = new discord.MessageEmbed()
        .setTitle('To do this, please remove your current listings first!')
        .setColor('a86b2f');
        
    msg.channel.send(embed);
}