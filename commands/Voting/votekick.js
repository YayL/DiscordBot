const vote = {
	run: function(client, player){
		player.kick("Voted to be kicked");
	}
}

module.exports = {
	name : "VoteKick",
	alias : ["kick", "vk", "votek"],
	use: "-VoteKick (@Member) (reason)",
	description : "Vote to kick a user",
	options: {ShowInHelp: true, Category: "Voting"},
	run : async function(msg, client, disc, args){
		try{
			const player = await client.m.utils.getMember(args[0], msg)
			if(!player) return client.m.utils.clearChat(msg, 1, client.channelId.voting);

			args.shift();
			const reason = args.join(" ");

			const title = "Vote Kick"
			const desc = `Do you wish to kick ${player}?`
			const fieldTitle = "Reason for kick"

			client.m.msg.createVote(title, desc, fieldTitle, reason, msg, disc)
			.then(em => {
				client.votes.set(em, [vote, player]);
			});
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
	}
}