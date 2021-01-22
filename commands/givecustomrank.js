module.exports = {
	name : "GiveCustomRank",
	alias : ["gcr", "givecr", "gcustomrank", "gcustomr", "gcrank"],
	description : "Creates a new rank for you",
	options: [true],
	users: [],
	run : function(msg, args, client, disc){
		console.log("Initiating custom rank creation for " + msg.author);
	}
}