module.exports = (client, discord, msg, amount) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`The gang bank account does not have $${client.utils.fixNumber(amount, true)}`)
        .setColor('a86b2f');
    msg.channel.send(embed);
}