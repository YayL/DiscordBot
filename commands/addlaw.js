const m = require('./../methodsLoader.js');

const vote = {
	run: function(args){
		m.data.getMaxRuleId(args[0])
		.then(id => {
			m.data.updateRules(args[0], args[1], args[2], "add", id+1);
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

		let name = "";
		let endOfName = 0;
		if(args[0].startsWith('"')) {
			for(str of args){
				name = name.concat(str, " ")
				if (str.endsWith('"')){
					endOfName = args.indexOf(str) +1;
					break
				}
			}
			name = name.replace(/(['"])/g, "");
		}else{name=args[0]}


		args = args.slice(endOfName);
		const description = args.join(" ");

		const title = "Law Proposition: " + name;
		const desc = `Do you agree with ${msg.member.user.username} that we need this law?`;
		const fieldTitle = "What will this law do?";
		const fieldText = description;

		m.msg.createVote(title, desc, fieldTitle, fieldText, msg, disc)
		.then(em => {
				client.votes.set(em, [vote, [client, name, description]]);
		});
	}
}

