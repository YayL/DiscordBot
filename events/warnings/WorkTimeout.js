module.exports = (client, disc, msg, timeleft) => {

    let seconds = Math.floor(timeleft) + 1;
    let minutes = Math.floor(seconds/60);
    seconds = Math.floor(seconds - minutes*60);

    const embed = new disc.MessageEmbed()
        .setTitle(`Take it easy now!`)
        .setDescription(`You must wait another ${minutes}m ${seconds}s before you can work again!`)
        .setColor('#30a93f')
        .setFooter("Make sure not to overwork! It becomes tiring");

    msg.channel.send(embed);
}