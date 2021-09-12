const vote = {
	run: function(client, args){
		client.data.rules.updateRules(client, args[0], args[1], "add");
	}
}

module.exports = {
	name : "AddLaw",
	alias : ["alaw"],
	use: "-AddLaw [Name] [Description]",
	description : "Propose a new a law/rule to the server. (Make sure to use quotation marks if the name uses spaces)",
	options: {ShowInHelp: true, Category: "Voting"},
	run : function(client, msg, args, discord){
		try{
			[name, args] = client.utils.argsWithSpace(args);
			
			const description = args.join(" "),
				title = "Law Proposition: ***" + name + "***",
				desc = `Do you agree with ${msg.member.user.username} that we need this law?`,
				fieldTitle = "What will this law do?",
				fieldText = description;

			client.msg.createVote(title, desc, fieldTitle, fieldText, msg, discord)
			.then(em => {
					client.votes.set(em, [vote, [name, description]]);
			});
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
	}
}
