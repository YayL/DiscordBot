module.exports = (client, discord, msg, usage) => {

    const embed = new discord.MessageEmbed()
        .setTitle('*Something went wrong!*')
        .setDescription(`Check your arguments again and see if it follows:\n${usage}`)
        .setColor(client.s.COLOR_SCHEME['WARNING'])
        .setFooter("Keep going, you're a champ!");
        
    msg.channel.send(embed);
}