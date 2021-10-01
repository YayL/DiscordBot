module.exports = (client, discord, msg, amount) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`The gang bank account does not have $${client.utils.fixNumber(amount, true)}`)
        .setColor(client.s.COLOR_SCHEME['GANGWARNING']);
    msg.channel.send(embed);
}