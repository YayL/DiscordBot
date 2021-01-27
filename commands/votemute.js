const m = require('../methodsLoader.js');

const muteCommand = {
	run: function(player){
		player.guild.roles.fetch(player.client.roleId.muted)
		.then(role => {
			player.roles.add(role);
		})
	}
}

module.exports = {
	name : "VoteMute",
	alias : ["mute", "vm", "votem"],
	use: "-VoteMute @[user] [reason]",
	description : "Vote to mute a user in Text Channels",
	options: [true],
	users: [],
	run : function(msg, client, disc, args){
		const player = args[0];
		if(!player){return}

		args.shift();
		const reason = args.join(" ");

		const title = "Vote Mute"
		const desc = `Do you wish to chat-mute ${player}?`
		const fieldTitle = "Reason for chat-mute: "
		const fieldText = `${msg.member.user.username} Wishes to chat-mute ${player} because: ${reason}`

		m.msg.createVote(title, desc, fieldTitle, fieldText, msg, disc)
		.then(em => {
			m.utils.parseUser(player, client)
			.then(plr => {
				if(plr === undefined){
					m.utils.clearChat(msg, 1, client.channelId.voting);
					return;
				}
				client.votes.set(em, [muteCommand, plr]);
			})
		});

	}
}