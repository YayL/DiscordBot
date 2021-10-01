module.exports = (client, discord, msg, usage) => {

    const embed = new discord.MessageEmbed()
        .setTitle('You have the Maximum amount of XP already')
        .setColor(client.s.COLOR_SCHEME['INFO']);
        
    msg.channel.send(embed);
}