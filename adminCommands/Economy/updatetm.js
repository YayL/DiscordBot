module.exports = {
	name: "UpdateTM",
	alias: ["utm"],
	use: "-UpdateTM",
	description: "Update Total Money of Server",
	options: {ShowInHelp: false},
	run: function(msg, client, disc){
		client.m.data.bal.updateTotalMoney(client);
		console.log(client.totalMoney)
	}
}