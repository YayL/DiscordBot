module.exports = {
	name: "UpdateLB",
	alias: ["ulb"],
	use: "-UpdateLB",
	description: "Update Money Leaderboard",
	options: {ShowInHelp: false},
	run: function(msg, client, disc){
		client.m.data.bal.updateLB(client);
	}
}