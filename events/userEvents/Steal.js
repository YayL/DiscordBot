module.exports = async (client, disc, msg, target, amount) => {

    const embed = new disc.MessageEmbed();

    if(amount <= 0){
        embed.setTitle(`Your attempt to steal money did not succeed`);
        embed.setDescription(`You can try again in ${client.userCooldowns.steal[1]/(60*1000)} minutes`)
        if(amount < 0){
            embed.setDescription(`You were forced to pay ${target} a fee of 💵 $${client.utils.fixNumber(-amount, true)}`)
        }
            
        
    }
    else if(amount > 0){
        embed.setTitle(`Steal successful`);
        embed.setDescription(`You acquiered 💵 $${client.utils.fixNumber(amount, true)} from ${target}`)
    }

    embed.setColor(client.s.COLOR_SCHEME['USER']);
        
    msg.channel.send(embed);

}