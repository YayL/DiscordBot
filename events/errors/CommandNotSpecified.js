module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`You did not specify a command!`)
        .setColor('b80909');

    msg.channel.send(embed);
}
