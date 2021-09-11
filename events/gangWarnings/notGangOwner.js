module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle('You are not the Owner of the guild')
        .setDescription(`To do this you must be the Owner of the guild!`)
        .setColor('a86b2f');
    msg.channel.send(embed);
}