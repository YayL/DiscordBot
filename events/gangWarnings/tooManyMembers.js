module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle('This gang is already full')
        .setColor('a86b2f');
    msg.channel.send(embed);
}