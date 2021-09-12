module.exports = (client, discord, msg, item_id) => {
    const embed = new discord.MessageEmbed()
        .setTitle(`Item ID: **__${item_id}__** could not be found!`)
        .setColor('#a86b2f');

    msg.channel.send(embed);
}