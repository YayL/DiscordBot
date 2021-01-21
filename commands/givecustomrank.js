module.exports = {
	name : "GiveCustomRank",
	alias : ["gcr", "givecr", "gcustomrank", "gcustomr", "gcrank"],
	description : "Creates a new rank for you",
	run : function(msg, client, cmds, disc, args){
		console.log("Initiating custom rank creation for " + msg.author);
	}
}