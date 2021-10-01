module.exports = (client, discord, msg, CommandName, args) => {
    
    const embed = new discord.MessageEmbed()
        .setTitle(`Command not found: __${CommandName} ${args.join(' ')}__`)
        .setColor(client.s.COLOR_SCHEME['ERROR']);

    msg.channel.send(embed);
}