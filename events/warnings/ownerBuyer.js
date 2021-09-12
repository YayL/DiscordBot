module.exports = (client, discord, msg) => {
    const embed = new discord.MessageEmbed()
        .setTitle('You are not allowed to buy your own listing!')
        .setColor('a86b2f');
        
    msg.channel.send(embed);
}