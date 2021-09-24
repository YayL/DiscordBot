module.exports = async (client, disc, msg, gang, upgrade, name) => {
    const embed = new disc.MessageEmbed()
        .setTitle(`${gang.info.NAME}'s | ${name} upgraded : ${client.utils.fixNumber(client.gang.info.getGangUpgrade(client, gang, upgrade, -1), true)} to ${client.utils.fixNumber(client.gang.info.getGangUpgrade(client, gang, upgrade), true)}`)
        .setColor(`#8d99b8`);

    msg.channel.send(embed);

}
