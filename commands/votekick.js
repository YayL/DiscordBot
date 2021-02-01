const m = require('../methodsLoader.js');

const vote = {
	run: function(player){
		//console.log("Kick player: "+player.user.username);
		player.kick("Voted to be kicked");
	}
}

module.exports = {
	name : "VoteKick",
	alias : ["kick", "vk", "votek"],
	use: "-VoteKick (@Member) (reason)",
	description : "Vote to kick a user",
	options: {ShowInHelp: true, Category: "Voting"},
	run : function(msg, client, disc, args){
		var player = m.utils.getMember(args[0]);
		if(!player){return}

		args.shift();
		const reason = args.join(" ");

		const title = "Vote Kick"
		const desc = `Do you wish to kick ${player}?`
		const fieldTitle = "Reason for kick"
		const fieldText = `${msg.member.user.username} Wishes to kick ${player} because: ${reason}`

		m.msg.createVote(title, desc, fieldTitle, fieldText, msg, disc)
		.then(em => {
			m.utils.getMember(player, client, msg)
			.then(plr => {
				if(plr === undefined){
					m.utils.clearChat(msg, 1, client.channelId.voting);
					return;
				}
				client.votes.set(em, [vote, plr]);
			})
		});

	}
}