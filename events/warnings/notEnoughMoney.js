module.exports = (client, discord, msg, money_required) => {
    const embed = new discord.MessageEmbed()
        .setTitle('You do not have enough money!')
        .setDescription(`Get some more money and try again! You need $${client.utils.fixNumber(money_required, true)} more!`)
        .setFooter('Stop being poor.. smh');

    msg.channel.send(embed);
}