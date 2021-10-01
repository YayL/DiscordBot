module.exports = (client, discord, msg, item) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`${item.name} is not for sale. Try listing it on the market instead!`)
        .setColor(client.s.COLOR_SCHEME['WARNING']);
        
    msg.channel.send(embed);
}