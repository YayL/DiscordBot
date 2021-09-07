module.exports = (client, discord, msg, CommandName, args) => {
    const embed = new discord.MessageEmbed()
        .setTitle(`Command not found: __${CommandName} ${args.join(' ')}__`)
        .setColor('b80909')
    msg.channel.send(embed);
}