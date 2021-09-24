module.exports = (client, discord, msg, gang, tokens_requiered) => {

    const embed = new discord.MessageEmbed()
        .setTitle('You do not have enough tokens')
        .setDescription(`You need **${tokens_requiered - Number(gang.tokens)} tokens`)
        .setColor('a86b2f');
    msg.channel.send(embed);
}