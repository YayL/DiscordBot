module.exports = (client, discord, msg) => {
    const embed = new discord.MessageEmbed()
        .setTitle('The lister is not allowed to purchase their own listing!')
        .setColor('a86b2f');
        
    msg.channel.send(embed);
}