module.exports = (client, discord, msg, gang) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`The vault is full! You can only store ${client.gang.info.getGangUpgrade(client, gang, 'Vault')} items`)
        .setColor(client.s.COLOR_SCHEME['GANGWARNING']);
    msg.channel.send(embed);
}