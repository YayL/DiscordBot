module.exports = async (client, disc, msg, gang, item, amount) => {
    const embed = new disc.MessageEmbed()
        .setTitle(`Item Withdrawn from Gang Vault`)
        .setDescription(`**${amount} ${item.name}** was withdraw from **${gang.info.NAME}'s** vault by ${msg.author}`)
        .setColor(client.s.COLOR_SCHEME['GANG']);

    msg.channel.send(embed);

}
