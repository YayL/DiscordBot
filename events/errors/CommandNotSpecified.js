module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`You did not specify a command!`)
        .setColor(client.s.COLOR_SCHEME['ERROR']);

    msg.channel.send(embed);
}
