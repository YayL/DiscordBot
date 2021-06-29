module.exports = (client, discord, msg, lookup_table) => {

    const embed = new discord.MessageEmbed()
        .setTitle('*The specified tier does not exist!*')
        .setDescription(`Please pick one of the following \n ***${lookup_table.join('\n')}***`)
        .setColor('a86b2f')
        .setFooter("-Lootbox [tier] [amount]");
    msg.channel.send(embed);
}