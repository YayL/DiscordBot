module.exports = (client, discord, msg, name) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`${name} is already in a gang`)
        .setColor('a86b2f');
    msg.channel.send(embed);
}