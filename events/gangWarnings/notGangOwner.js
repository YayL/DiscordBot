module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle('You are not the owner of the guild')
        .setColor('a86b2f');
    msg.channel.send(embed);
}