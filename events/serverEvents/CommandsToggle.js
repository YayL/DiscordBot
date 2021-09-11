module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed();

    if(!client.allowCommands)
        embed.setTitle('Commands are currently turned off!');
    else
        embed.setTitle('Commands are now enabled again!');
    embed.setColor('a86b2f');
    
    msg.channel.send(embed);
}