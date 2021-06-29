module.exports = (client, discord, msg, usage) => {

    const embed = new discord.MessageEmbed()
        .setTitle('*Something went wrong!*')
        .setDescription(`Check your arguments again and see if it follows: ${usage}`)
        .setColor('a86b2f')
        .setFooter("Keep going, you're a champ!");
    msg.channel.send(embed);
}