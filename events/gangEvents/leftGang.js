module.exports = async (client, disc, msg) => {
	try{
		var embed = new disc.MessageEmbed()
			.setTitle(`You have now left the gang`)
			.setDescription(`You can join another guild using -gjoin and create one using -gcreate`)
			.setColor(`#8d99b8`);

		msg.channel.send(embed);
	}catch(e){
		client.msg.log("ERR", e, client.guild);
	}
}
