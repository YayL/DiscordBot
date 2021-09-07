module.exports = async (client, disc, msg, name) => {
	try{
		var embed = new disc.MessageEmbed()
			.setTitle(`You have now joined the gang: __${name.charAt(0).toUpperCase() + name.slice(1)}__`)
			.setDescription(`Type **-gang** for more info on things to do now!`)
			.setColor(`#8d99b8`)

		msg.channel.send(embed);

	}catch(e){
		client.msg.log(client.guild, e)
	}
}