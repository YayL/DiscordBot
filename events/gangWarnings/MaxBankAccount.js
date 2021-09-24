module.exports = (client, discord, msg, gang) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`The bank account is full! The maximum balance is $${client.utils.fixNumber(client.gang.info.getGangUpgrade(client, gang, 'Bank'), true)}`)
        .setColor('a86b2f');
    msg.channel.send(embed);
}