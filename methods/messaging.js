module.exports = {
	createVote(title, description, fieldTitle, fieldText, msg, discord){
		var embed = new discord.MessageEmbed()
			.setTitle(title)
			.setDescription(description)
			.setColor('#74ed4c')
			.setFooter("Vote below if you agree or disagree!")
			.addFields({
				name: fieldTitle,
				value: fieldText
			})
		const channel = msg.guild.channels.cache.get(msg.client.channelId.voting);
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

	errorReply(msg, text, discord, footer){
		if(footer == undefined){
			footer = "Make sure to input correct arguments!";
		}

		var embed = new discord.MessageEmbed()
			.setTitle("**A problem occured**")
			.addFields({
				name: "Error:",
				value: text
			})
			.setColor('#b80909')
			.setFooter(footer)

		msg.channel.send(embed).catch(console.error);
	},

	reply(msg, title, text, discord){
		var embed = new discord.MessageEmbed()
			.setTitle(`**${title}**`)
			.setDescription(text)
			.setColor('#0ac2c2')
			.setFooter("Have a good day!")
		

		msg.channel.send(embed).catch(console.error);
	},

	log(msg, toLog, discord){
		const embed = new discord.MessageEmbed()
			.setTitle("**Log:**")
			.setDescription(toLog)
			.setColor("#FFFFFF")
			.setFooter("Hope you're having a great day! :)");
		msg.channel.send(embed).catch(console.error)
	}
}