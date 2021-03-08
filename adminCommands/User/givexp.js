module.exports = {
	name: "GiveXP",
	alias: ["xp"],
	use: "-GiveXP @[user] [amount]",
	description: "Give a user some amount of xp",
	options: {ShowInHelp: false},
	run: function(msg, client, disc, args){
		if(args[0] == "me"){
			return client.m.data.user.addXP(client, msg, msg.member, Number(args[1]), false);
		}
		client.m.utils.getMember(args[0], msg)
		.then(member => {
			return client.m.data.user.addXP(client, msg, member, Number(args[1]), false);
		})
	}
}