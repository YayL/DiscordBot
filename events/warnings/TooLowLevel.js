module.exports = (client, discord, msg, user, requiredLevel=0) => {
    const LEVEL_REQUIRED = (requiredLevel == 0 ? client.data.jobs.expToLevel(user.experience)+1 : requiredLevel),
        embed = new discord.MessageEmbed()
            .setTitle('You are too low of a level!')
            .setDescription(`To do this you require a level of **${LEVEL_REQUIRED}** or higher`)
            .setColor(client.s.COLOR_SCHEME['USER'])
            .setFooter("Keep going, you're a champ!");
            
    msg.channel.send(embed);
}