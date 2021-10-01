module.exports = (client, discord, msg) => {
    const embed = new discord.MessageEmbed()
        .setTitle('The amount specified is not a valid amount')
        .setDescription('Please choose a number greater than 0')
        .setColor(client.s.COLOR_SCHEME['ERROR']);

    msg.channel.send(embed);
}
