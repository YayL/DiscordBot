module.exports = (client, discord, msg, amount, name) => {
    if(amount==-1) 
        amount = 1;

    const embed = new discord.MessageEmbed()
        .setTitle('You do not appear to have the required amount');
    if(!name) 
        embed.setTitle(`Your inventory is empty. Get some items and try again!`);
    else 
        embed.setDescription(`Check your inventory and see if you at least have **x${amount} ${name}**`);
    embed.setColor('a86b2f');

    msg.channel.send(embed);
}