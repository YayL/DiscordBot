const m = require('../methodsLoader.js');

const kickCommand = {
	run: function(player){
		//console.log("Kick player: "+player.user.username);
		player.kick("Voted to be kicked");
	}
}

module.exports = {
	name : "VoteKick",
	alias : ["kick", "vk", "votek"],
	use: "-VoteKick @[user] [reason]",
	description : "Vote to kick a user",
	options: [true],
	users: [],
	run : function(msg, client, disc, args){
		var player = args[0];
		if(!player){return}

		args.shift();
		const reason = args.join(" ");

		const title = "Vote Kick"
		const desc = `Do you wish to kick ${player}?`
		const fieldTitle = "Reason for kick"
		const fieldText = `${msg.member.user.username} Wishes to kick ${player} because: ${reason}`

		m.msg.createVote(title, desc, fieldTitle, fieldText, msg, disc)
		.then(em => {
			m.utils.parseUser(player, client)
			.then(plr => {
				if(plr === undefined){
					m.utils.clearChat(msg, 1, client.channelId.voting);
					return;
				}
				client.votes.set(em, [kickCommand, plr]);
			})
		});

	}
}