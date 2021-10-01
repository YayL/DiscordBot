module.exports = (client, discord, msg, name) => {

    const embed = new discord.MessageEmbed()
        .setTitle('Specified gang does not exist')
        .setDescription(`The gang: ${name} does not appear to be an existing gang`)
        .setColor(client.s.COLOR_SCHEME['GANGWARNING']);
    msg.channel.send(embed);
}