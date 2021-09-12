module.exports = (client, discord, msg, gang_name) => {

    const embed = new discord.MessageEmbed()
        .setTitle('*Unavailable gang name*')
        .setDescription(`There already appears to be a gang with the name **${gang_name}**`)
        .setColor('a86b2f');
    msg.channel.send(embed);
}