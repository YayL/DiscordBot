const func = require("../customMethods.js");

module.exports = {
	name: "TestEvent",
	alias: ["te", "tevent"],
	description: "Test event",
	options: [false],
	users: ["183617597365813248"],
	run: function(msg, args, client, disc){
		client.emit("messageReactionAdd", msg);
	}
}