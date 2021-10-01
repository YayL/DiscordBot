module.exports = (client, discord, msg, item_id) => {
    const embed = new discord.MessageEmbed()
        .setTitle(`Item ID: **__${item_id}__** is not a valid item!`)
        .setColor(client.s.COLOR_SCHEME['WARNING']);

    msg.channel.send(embed);
}