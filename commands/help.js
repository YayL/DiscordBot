module.exports = {
	name : "help",
	alias : ["h", "info", "cmds", "commands"],
	description : "Displays all available commands",
	run : function(msg, args){
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