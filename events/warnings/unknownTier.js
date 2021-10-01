module.exports = (client, discord, msg, lookup_table) => {

    const embed = new discord.MessageEmbed()
        .setTitle('*The specified tier does not exist!*')
        .setDescription(`Please pick one of the following \n ***${lookup_table.map(ind => ind.charAt(0).toUpperCase() + ind.slice(1)).join('\n')}***`)
        .setColor(client.s.COLOR_SCHEME['INFO'])
        .setFooter("-Lootbox [tier] [amount]");
        
    msg.channel.send(embed);
}