module.exports = (client, discord, msg, gang, amount) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`Money Withdrawn from Gang Bank Account`)
        .setDescription(`**$${client.utils.fixNumber(amount, true)}** was withdrawn from **${gang.info.NAME}'s** bank account by ${msg.author}`)
        .setColor(client.s.COLOR_SCHEME['GANG']);
    msg.channel.send(embed);
}