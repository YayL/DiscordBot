const vote = {
	run: function(client, player){
		player.guild.roles.fetch(client.roleId.muted)
		.then(role => {
			player.roles.add(role);
		})
	}
}

module.exports = {
	name : "VoteMute",
	alias : ["mute", "vm", "votem"],
	use: "-VoteMute (@Member) (reason)",
	description : "Vote to mute a user in Text Channels",
	options: {ShowInHelp: true, Category: "Voting"},
	run : function(msg, client, disc, args){
		const player = client.m.utils.getMember(args[0]);
		if(!player){return}

		args.shift();
		const reason = args.join(" ");

		const title = "Vote Mute"
		const desc = `Do you wish to chat-mute ${player}?`
		const fieldTitle = "Reason for chat-mute: "
		const fieldText = `${msg.member.user.username} Wishes to chat-mute ${player} because: ${reason}`

		client.m.msg.createVote(title, desc, fieldTitle, fieldText, msg, disc)
		.then(em => {
			client.m.utils.getMember(player, client, msg)
			.then(plr => {
				if(plr === undefined){
					client.m.utils.clearChat(msg, 1, client.channelId.voting);
					return;
				}
				client.votes.set(em, [vote, plr]);
			})
		});

	}
}