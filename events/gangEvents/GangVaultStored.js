module.exports = async (client, disc, msg, gang, item, amount) => {
    const embed = new disc.MessageEmbed()
        .setTitle(`Item Added to Gang Vault`)
        .setDescription(`**${amount} ${item.name}** was added to **${gang.info.NAME}'s** vault by ${msg.author}`)
        .setColor(`#8d99b8`);

    msg.channel.send(embed);

}
