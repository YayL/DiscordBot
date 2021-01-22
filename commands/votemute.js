module.exports = {
	name : "VoteMute",
	alias : ["mute", "vm", "votem"],
	description : "Vote to mute a user in Voice Channels",
	options: [true],
	users: [],
	run : function(msg, args, client, disc){
		console.log("Initiating mute vote");
	}
}