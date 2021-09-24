module.exports = (client, discord, msg, gang, experience_grant) => {

    const tokens = client.gang.tokens.calculateTokenGift(client.data.jobs.xpToLevel(Number(gang.xp) + experience_grant));

    client.gang.tokens.addTokens(client, gang, tokens);

    const embed = new discord.MessageEmbed()
        .setTitle(`${gang.info.NAME} has leveled up to level ${client.data.jobs.xpToLevel(Number(gang.xp) + experience_grant)}`)
        .setDescription(`**${tokens}** tokens has been added`)
        .setColor(`#8d99b8`);
    msg.channel.send(embed);
}