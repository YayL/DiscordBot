module.exports = (client, discord, msg) => {
    const embed = new discord.MessageEmbed()
        .setTitle('You do not have enough money for this!')
        .setColor('a86b2f');
        
    msg.channel.send(embed);
}