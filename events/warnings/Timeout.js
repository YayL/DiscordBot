module.exports = (client, disc, msg, timeleft) => {

    const embed = new disc.MessageEmbed()
        .setTitle(`Take it easy now!`)
        .setDescription(`You must wait another ${client.utils.timeFormat(Math.ceil(timeleft*10)/10)} before you can do this again!`)
        .setColor('#30a93f')
        .setFooter("Make sure not to strain yourself!");

    msg.channel.send(embed);
}