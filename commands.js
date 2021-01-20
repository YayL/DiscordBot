const {MessageEmbed} = require('discord.js');

var cmds = {};

cmds.help = {
	Name : "Help",
	Alias : ["h", "info", "cmds", "commands"],
	Description : "Displays all available commands",
	Run : function(msg, args){
		console.log("Check DMs");

		const embed = new MessageEmbed()
			.setTitle("All server commands")
			.setColor(0x9aedea)
			for(i = 0; i < cmds.length; i++){
				embed.addFields(cmds[i].Name, cmds[i].Description)
			}
		msg.channel.send(embed);
			
	}
}

cmds.votekick = {
	Name : "VoteKick",
	Alias : ["kick", "vk", "votek"],
	Description : "Vote to kick a user",
	Run : function(msg, args){
		console.log("Initiating kick vote");
	}
}

cmds.votemute = {
	Name : "VoteMute",
	Alias : ["mute", "vm", "votem"],
	Description : "Vote to mute a user in Voice Channels",
	Run : function(msg, args){
		console.log("Initiating mute vote");
	}
}

cmds.createtextchannel = {
	Name : "CreateTextChannel",
	Alias : ["ctc", "createtc", "ctextchannel", "ctextc"],
	Description : "Create a new text channel",
	Run : function(msg, args){
		console.log("Initiating creating text channel vote");
	}
}

cmds.givecustomrank = {
	Name : "GiveCustomRank",
	Alias : ["gcr", "givecr", "gcustomrank", "gcustomr", "gcrank"],
	Description : "Creates a new rank for you",
	Run : function(msg, args){
		console.log("Initiating custom rank creation for " + msg.author);
	}
}

module.exports = cmds
