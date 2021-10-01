module.exports = (client, discord, msg) => {
    const embed = new discord.MessageEmbed()
        .setTitle('You are unemployed!')
        .setDescription('To use this command you must be employed!\n' +
            'Type **-jobs** to start your career')
        .setColor(client.s.COLOR_SCHEME['INFO'])
        .setFooter("Never forget the role you play in this society, make sure to contribute by working!");

    msg.channel.send(embed);
}