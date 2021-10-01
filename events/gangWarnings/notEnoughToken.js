module.exports = (client, discord, msg, gang, tokens_requiered) => {

    const embed = new discord.MessageEmbed()
        .setTitle('You do not have enough tokens')
        .setDescription(`You need **${tokens_requiered - Number(gang.tokens)} tokens`)
        .setColor(client.s.COLOR_SCHEME['GANGWARNING']);
    msg.channel.send(embed);
}