module.exports = (client, discord, msg, CommandName, args, e, cmdh=false) => {
    
    const embed = new discord.MessageEmbed()
        .setTitle(`There was an issue with the command: __${CommandName} ${args.join(' ')}__`)
        .setColor(client.s.COLOR_SCHEME['ERROR']);

    msg.channel.send(embed);
    
    client.msg.log("ERR", e, msg.guild);
}
