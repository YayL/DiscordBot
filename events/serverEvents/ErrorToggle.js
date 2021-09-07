module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
    if(!client.s.LOG_ERRORS_TO_DISCORD) embed.setTitle('Error logging in discord is now turned off!')
    else embed.setTitle('Error logging in discord has now been enabled again!')
    embed.setColor('a86b2f')
    msg.channel.send(embed);
}