module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle('Process finished successfully!')

    embed.setColor('a86b2f');

    msg.channel.send(embed);
}
