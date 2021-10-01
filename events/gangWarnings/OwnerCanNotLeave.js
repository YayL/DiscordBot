module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle('The owner is not allowed to leave their gang')
        .setDescription(`You can try disbanding the gang or transfering the ownership`)
        .setColor(client.s.COLOR_SCHEME['GANGWARNING']);
    msg.channel.send(embed);
}