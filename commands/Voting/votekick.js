const vote = {
    run: function(client, player){
        player.kick("Voted to be kicked");
    }
}

module.exports = {
    name : "VoteKick",
    alias : ["kick", "vk", "votek"],
    use: "-VoteKick @[user] [reason]",
    description : "Vote to kick a user",
    options: {ShowInHelp: true, Category: "Voting"},
    run : async function(client, msg, args, discord){
        try{
            const player = await client.utils.getMember(args[0], msg);

            if(player == null) 
                return !msg.deleted ? msg.delete : false

            var reason = args.slice(1).join(" ");

            if(reason.length == 0) 
                reason = 'Because I said so';

            const title = "Vote Kick",
                desc = `Do you wish to kick ${player}?`,
                fieldTitle = "Reason for kick";

            client.msg.createVote(title, desc, fieldTitle, reason, msg, discord)
            .then(em => {
                client.votes.set(em, [vote, player]);
            });
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
    }
}
