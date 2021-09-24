module.exports = (client, discord, msg, gang, user) => {

    const embed = new discord.MessageEmbed()
        .setTitle(`You have been invited to ${gang.info.NAME}`)
        .setDescription(`You were invited by ${msg.author}`)
        .setFooter(`You can join by writing -gjoin ${gang.name} on the server`)
        .setColor(`#8d99b8`);
    user.send(embed);
}