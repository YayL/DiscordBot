const vote = {
	run: function(client, args){
		client.m.data.rules.getMaxRuleId(client)
		.then(id => {
			client.m.data.rules.updateRules(client, args[0], args[1], "add", id+1);
		})
	}
}

module.exports = {
	name : "AddLaw",
	alias : ["alaw"],
	use: "-AddLaw \"Name\" (Description)",
	description : "Propose a new a law/rule to the server. (Make sure to use quotation marks if the name uses spaces)",
	options: {ShowInHelp: true, Category: "Voting"},
	run : function(msg, client, disc, args){
		try{
			[name, args] = client.m.utils.argsWithSpace(args);
			const description = args.join(" ");

			const title = "Law Proposition: ***" + name + "***";
			const desc = `Do you agree with ${msg.member.user.username} that we need this law?`;
			const fieldTitle = "What will this law do?";
			const fieldText = description;

			client.m.msg.createVote(title, desc, fieldTitle, fieldText, msg, disc)
			.then(em => {
					client.votes.set(em, [vote, [name, description]]);
			});
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
	}
}

