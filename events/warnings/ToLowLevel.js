module.exports = (client, discord, msg, user) => {
    const levelRequired = client.m.data.jobs.xpToLevel(user.job_xp)
    const xpRequired = client.m.data.jobs.totalLvlXp(levelRequired)-user.job_xp

    const embed = new discord.MessageEmbed()
        .setTitle('*You require more experience!*')
        .setDescription(`To develop your career you need *${xpRequired}xp* more xp`)
        .setColor('a86b2f')
        .setFooter("Keep going, you're a champ!");
    msg.channel.send(embed);
}