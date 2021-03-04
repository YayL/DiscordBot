module.exports = {
	name: "TestEvent",
	alias: ["te", "tevent"],
	use: "-TestEvent",
	description: "Test event",
	options: {ShowInHelp: false},
	run: function(msg, client, disc){
		client.m.msg.reply(msg, 'Test', 'This is another test', disc);
	}
}