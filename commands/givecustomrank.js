module.exports = {
	name : "givecustomrank",
	alias : ["gcr", "givecr", "gcustomrank", "gcustomr", "gcrank"],
	description : "Creates a new rank for you",
	run : function(msg, args){
		console.log("Initiating custom rank creation for " + msg.author);
	}
}