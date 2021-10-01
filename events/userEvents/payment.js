module.exports = async (client, disc, msg, reciever, amount) => {

    const name = await client.utils.getMember(reciever.id, msg);

    const embed = new disc.MessageEmbed()
        .setTitle('Payment Transfered Successfully')
        .setDescription(`💵 $${client.utils.fixNumber(amount, true)} was transfered **FROM** 
        ${msg.member} **TO** ${name}`)
        .setColor(client.s.COLOR_SCHEME['USER']);
        
    msg.channel.send(embed);

}