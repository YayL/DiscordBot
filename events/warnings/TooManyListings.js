module.exports = (client, discord, msg) => {
    const embed = new discord.MessageEmbed()
        .setTitle('You have too many listings open, remove some and try again!')
        .setColor('a86b2f');
        
    msg.channel.send(embed);
}