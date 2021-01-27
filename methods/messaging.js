module.exports = {
	createVote: (title, description, fieldTitle, fieldText, msg, discord) => {
		var embed = new discord.MessageEmbed()
			.setTitle(title)
			.setDescription(description)
			.setColor('#74ed4c')
			.setFooter("Vote below if you agree or disagree!")
			.addFields({
				name: fieldTitle,
				value: fieldText
			})
		const channel = msg.guild.channels.cache.get(client.channelId.voting);
		try{
		return channel.send(embed)
		.then(em => {
			em.react("✅");
			em.react("❌");
			return em;
		})
		}catch(e){
			clearChat(msg, 1);
		}
	},

	errorReply: (msg, text, client, discord, customFooter) =>{
		if(customFooter == undefined){
			customFooter = "Make sure to input correct arguments!";
		}

		var embed = new discord.MessageEmbed()
			.setTitle("**Problem**")
			.setDescription(`${text}`)
			.setColor('#b80909')
			.setFooter("Make sure to input correct arguments!")

		msg.channel.send(embed).catch(console.error);
	},

	reply: (msg, title, text, client, discord) => {
		var embed = new discord.MessageEmbed()
			.setTitle(`**${title}**`)
			.setDescription(text)
			.setColor('#0ac2c2')
			.setFooter("Have a good day!")
		

		msg.channel.send(embed).catch(console.error);
	}
}