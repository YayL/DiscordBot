module.exports = {
	name: "TestEvent",
	alias: ["te", "tevent"],
	use: "-TestEvent",
	description: "Test event",
	options: {ShowInHelp: false},
	run: function(msg, client, disc, args){
		let xp = Number(args[0])
		client.m.msg.reply(msg, "Your Level Is:", client.m.data.jobs.xpToLevel(xp), disc)
	}
}