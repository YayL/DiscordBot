module.exports = (client, discord, msg, usage) => {

    const embed = new discord.MessageEmbed()
        .setTitle('You have the Maximum amount of XP already')
        .setColor('a86b2f');
        
    msg.channel.send(embed);
}