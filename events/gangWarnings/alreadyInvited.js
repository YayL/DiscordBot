module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle('This user is already invited')
        .setDescription(`Wait for them to join or remove them`)
        .setColor('a86b2f')
    msg.channel.send(embed);
}