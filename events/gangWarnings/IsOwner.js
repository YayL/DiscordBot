module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`This user is the owner, this can not be done on the owner!`)
        .setColor('a86b2f');
    msg.channel.send(embed);
}