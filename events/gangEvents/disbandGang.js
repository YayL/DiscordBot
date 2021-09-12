module.exports = async (client, disc, msg, name) => {
	try{
		var embed = new disc.MessageEmbed()
			.setTitle(`You have disbanded the gang: __${name.charAt(0).toUpperCase() + name.slice(1)}__`)
			.setDescription(`All members of this gang have been removed and the gang no longer exists`)
			.setColor(`#8d99b8`);

		msg.channel.send(embed);
	}catch(e){
		client.msg.log("ERR", e, client.guild);
	}
}
