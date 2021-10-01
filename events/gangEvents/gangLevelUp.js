module.exports = (client, discord, msg, gang, experience_grant) => {

    const tokens = client.gang.tokens.calculateTokenGift(client.data.jobs.expToLevel(Number(gang.experience) + experience_grant));

    client.gang.tokens.addTokens(client, gang, tokens);

    const embed = new discord.MessageEmbed()
        .setTitle(`${gang.info.NAME} has leveled up to level ${client.data.jobs.expToLevel(Number(gang.experience) + experience_grant)}`)
        .setDescription(`**${tokens}** tokens has been added`)
        .setColor(client.s.COLOR_SCHEME['GANG']);
    msg.channel.send(embed);
}