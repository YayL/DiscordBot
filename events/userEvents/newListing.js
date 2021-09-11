module.exports = async (client, disc, msg, item_name, amount) => {

    const embed = new disc.MessageEmbed()
        .setTitle(`Market listing`)
        .setDescription(`**${amount} ${item_name}s** have been added to your market listings`);
    msg.channel.send(embed);

}