module.exports = (client, discord, msg, name) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`${name} is already in a gang`)
        .setColor(client.s.COLOR_SCHEME['GANGWARNING']);
    msg.channel.send(embed);
}