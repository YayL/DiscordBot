module.exports = (client, discord, msg, gang, amount) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`Money Deposited to Gang Bank Account`)
        .setDescription(`**$${client.utils.fixNumber(amount, true)}** was deposited to **${gang.info.NAME}'s** bank account by ${msg.author}`)
        .setColor(`#8d99b8`);
    msg.channel.send(embed);
}