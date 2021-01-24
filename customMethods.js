function getChannel(msg, channel) {
	var regex = /\d+/g
	if(channel == undefined){
		return msg.channel
	}
	console.log(channel);
	try{
		return msg.guild.channels.cache.get(channel.match(regex)[0]);
	}catch(e){console.log(e)}
}

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
			const channel = msg.guild.channels.cache.get('801914827760205885');
			try{
			channel.send(embed)
			.then(em => {
				em.react("✅");
				em.react("❌");
				return em;
			})
			}catch(e){
				clearChat(msg, 1);
			}

	},

	clearChat: (msg, amount, channel) => {
		channel = getChannel(msg, channel);
		try{
			if(typeof(amount) === 'number'){
				channel.bulkDelete(amount).catch(e => console.log(e)); // Remove set amount of messages younger than 2 weeks old
			}else if(amount === "all"){
				channel.messages.fetch({limit: 100})
					.then(fetched => {
						channel.bulkDelete(fetched)})
					.catch(console.error);
			}

		}catch(e){console.log(e)}

		
	},

	giveRole: (user, role) => {
		user.roles.add(role)
		.catch(console.error);
	},

	removeRole: (user, role) => {
		user.roles.add(role)
		.catch(console.error);
	},

	sleep: (ms) => {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		})
	}
}