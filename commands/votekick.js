const func = require('../customMethods.js');

function kick(player){
	player.kick("Voted to be kicked");
}

module.exports = {
	name : "VoteKick",
	alias : ["kick", "vk", "votek"],
	use: "-VoteKick @[user] [reason]",
	description : "Vote to kick a user",
	options: [true],
	users: [],
	run : function(msg, args, client, disc){
		const player = args[0];
		if(!player){return}

		args.shift();
		const reason = args.join(" ");

		const title = "Vote Kick"
		const desc = `Do you wish to kick ${player}?`
		const fieldTitle = "Reason for kick"
		const fieldText = `${msg.member.user.username} Wishes to kick ${player} because: ${reason}`

		const em = func.createVote(title, desc, fieldTitle, fieldText, msg, disc);

		client.votes.set(em, kick(player));

	}
}