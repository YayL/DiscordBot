module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle('You are not the owner of the guild')
        .setColor(client.s.COLOR_SCHEME['GANGWARNING']);
    msg.channel.send(embed);
}