module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle('You are already in a gang')
        .setDescription(`To do this, leave the gang and try again later`)
        .setColor('a86b2f')
    msg.channel.send(embed);
}