module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle('You are already in a gang')
        .setDescription(`To do this, leave the gang and try again later`)
        .setColor(client.s.COLOR_SCHEME['GANGWARNING']);
    msg.channel.send(embed);
}