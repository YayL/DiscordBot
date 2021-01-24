const func = require('../customMethods.js');

module.exports = {
	name : "VoteMute",
	alias : ["mute", "vm", "votem"],
	use: "-VoteMute @[user] [reason]",
	description : "Vote to mute a user in Voice Channels",
	options: [true],
	users: [],
	run : function(msg, args, client, disc){
		const player = args[0];
		if(!player){return}

		args.shift();
		const reason = args.join(" ");

		const title = "Vote Mute"
		const desc = `Do you wish to chat-mute ${player}?`
		const fieldTitle = "Reason for chat-mute: "
		const fieldText = `${msg.member.user.username} Wishes to chat-mute ${player} because: ${reason}`

		const vote = func.createVote(title, desc, fieldTitle, fieldText, msg, disc);
		
		if(vote == "Voted Yes") {
			console.log("Hmm adios");
		}else if(vote == "Voted No"){
			console.log("Nah nope");
		}else if(vote == "Time Limit"){
			console.log("Time expired"); 
		}

	}
}