module.exports = (client, discord, msg, user, requiredLevel=0) => {
    const LEVEL_REQUIRED = (requiredLevel == 0 ? client.data.jobs.xpToLevel(user.job_xp)+1 : requiredLevel)

    const embed = new discord.MessageEmbed()
        .setTitle('You are too low of a level!')
        .setDescription(`To do this you require a level of **${LEVEL_REQUIRED}** or higher`)
        .setColor('a86b2f')
        .setFooter("Keep going, you're a champ!");
    msg.channel.send(embed);
}