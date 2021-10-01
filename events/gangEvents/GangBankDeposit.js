module.exports = (client, discord, msg, gang, amount) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`Money Deposited to Gang Bank Account`)
        .setDescription(`**$${client.utils.fixNumber(amount, true)}** was deposited to **${gang.info.NAME}'s** bank account by ${msg.author}`)
        .setColor(client.s.COLOR_SCHEME['GANG']);
    msg.channel.send(embed);
}