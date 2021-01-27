module.exports = {
	clearChat(msg, amount, channel){
		channel = this.getChannel(msg, channel);
		try{
			if(typeof(amount) === 'number'){
				channel.bulkDelete(amount).catch(e => console.log(e)); // Remove set amount of messages younger than 2 weeks old
			}
		}catch(e){console.log(e)}
	},

	parseUser: async (player, client) => {
		if(player == undefined){return}
		if(player.startsWith('<@') && player.endsWith('>')) {
			player = player.slice(2, -1);
			if (player.startsWith('!')) {
				player = player.slice(1);

			}

			const user = client.users.cache.get(player);
			return client.guilds.fetch(client.guildId)
			.then(guild => {
				return guild.members.fetch(user.id)
				.then(member => {
					return member;
				});
			})
			.catch(console.error);
			}
	},

	getChannel: (msg, channel) => {
		var regex = /\d+/g
		if(channel == undefined){
			return msg.channel
		}
		console.log(channel);
		try{
			return msg.guild.channels.cache.get(channel.match(regex)[0]);
		}catch(e){console.log(e)}
	}
}