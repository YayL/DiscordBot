module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle('You must be invited to join this gang')
        .setDescription(`Ask the Owner to invite you and try again!`)
        .setColor(client.s.COLOR_SCHEME['GANGWARNING']);
    msg.channel.send(embed);
}