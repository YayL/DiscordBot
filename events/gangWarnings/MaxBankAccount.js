module.exports = (client, discord, msg, gang) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`The bank account is full! The maximum balance is $${client.utils.fixNumber(client.gang.info.getGangUpgrade(client, gang, 'Bank'), true)}`)
        .setColor(client.s.COLOR_SCHEME['GANGWARNING']);
    msg.channel.send(embed);
}