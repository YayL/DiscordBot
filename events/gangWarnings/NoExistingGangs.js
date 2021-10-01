module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle('There are no exisiting gangs')
        .setDescription(`There is no need to use this command as the `+
            `new gangs will automatically get the new template as long as the bot has been restarted`)
        .setColor(client.s.COLOR_SCHEME['GANGWARNING']);
    msg.channel.send(embed);
}