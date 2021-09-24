module.exports = async (client, disc, msg, gang, item, amount) => {
    const embed = new disc.MessageEmbed()
        .setTitle(`Item Withdrawn from Gang Vault`)
        .setDescription(`**${amount} ${item.name}** was withdraw from **${gang.info.NAME}'s** vault by ${msg.author}`)
        .setColor(`#8d99b8`);

    msg.channel.send(embed);

}
