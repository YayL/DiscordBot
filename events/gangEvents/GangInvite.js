module.exports = (client, discord, msg, gang, user) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`You have been invited to ${gang.info.NAME}`)
        .setDescription(`You were invited by ${msg.author}`)
        .setFooter(`You can join by writing -gjoin ${gang.name} on the server`)
        .setColor(client.s.COLOR_SCHEME['GANG']);
    user.send(embed);
}