module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle('You can not do this to yourself')
        .setColor('a86b2f');
        
    msg.channel.send(embed);
}