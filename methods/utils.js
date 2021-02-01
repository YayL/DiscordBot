const util = require('util'); 

function getChannel(msg, channel){
	var regex = /\d+/g
	if(channel == undefined){
		return msg.channel
	}
	return msg.guild.channels.cache.get(channel.match(regex)[0]);
}

module.exports = {
	clearChat: async (msg, amount, channel) => {
		channel = await getChannel(msg, channel);
		try{
			if(typeof(amount) === 'number'){
				channel.bulkDelete(amount).catch(console.error); // Remove set amount of messages younger than 2 weeks old
			}
		}catch(e){
			console.log(e);
		}
	},

	getMember: async (player, client, reference) => {
		if(player == undefined){return}
		if(player.startsWith('<@') && player.endsWith('>')) {
			player = player.slice(2, -1);
			if (player.startsWith('!')) {
				player = player.slice(1);

			}

			const user = client.users.cache.get(player);
			return reference.guild.members.fetch(user.id)
			.then(member => {
				return member;
			});
		}
	},

	getChannel(msg, channel){
		return getChannel(msg, channel);
	},

	numberWithCommas(n){
		return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
}