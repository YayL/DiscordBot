const func = require('../customMethods.js');

module.exports = {
	name : "VoteKick",
	alias : ["kick", "vk", "votek"],
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

		func.createVote(title, desc, fieldTitle, fieldText, msg, disc)
	}
}