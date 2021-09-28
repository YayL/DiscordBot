module.exports = (client, discord, msg, requirement) => {
    const embed = new discord.MessageEmbed()
        .setTitle('Too small of an amount!')
        .setDescription(`Please enter a value above $${client.utils.fixNumber(requirement, true)}!`)

    msg.channel.send(embed);
}