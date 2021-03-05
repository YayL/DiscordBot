module.exports = {
	name: "AddBalance",
	alias: ["abal", "addbal"],
	use: "-AddBalance @[user] [amount]",
	description: "Add to users bal",
	options: {ShowInHelp: false},
	run: function(msg, client, disc, args){
		if(args[0] == "me"){
			return client.m.data.bal.updateUserBalance(client, msg.author, args[1], "add");
		}
		client.m.utils.getMember(args[0], msg)
		.then(member => {
			return client.m.data.bal.updateUserBalance(client, member, args[1], "add");
		})
	}
}