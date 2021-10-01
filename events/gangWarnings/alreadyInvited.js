module.exports = (client, discord, msg) => {

    const embed = new discord.MessageEmbed()
        .setTitle('This user is already invited')
        .setDescription(`Wait for them to join or remove them`)
        .setColor(client.s.COLOR_SCHEME['GANGWARNING']);
    msg.channel.send(embed);
}