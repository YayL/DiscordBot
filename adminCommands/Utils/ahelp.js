function printCommandCategories(msg, disc, cmds){
	let embed = new disc.MessageEmbed() // Create embeded message
			.setTitle("*** Admin-Commands:***") // Set the title
			.setFooter("Anarchy!"+"\u3000".repeat(100)+"|")
			.setColor('#9aedea') // Give it a color in hexidecimal format
		for(var i = 0; i < cmds.length; i++){ // Loop through command collection
            if(i%8==0 && i != 0){
                msg.author.send(embed);
                embed = new disc.MessageEmbed() // Create embeded message
					.setColor('#9aedea') // Give it a color in hexidecimal format
					.setFooter("Anarchy!"+"\u3000".repeat(100)+"|");
			}
			embed.addFields({
				name: "---------------------",
				value: "\u200b"},
			{
				name: "**__" + cmds[i].name + "__**",
				value: cmds[i].description + "\n",
				inline: false},
			{
				name: "***Use***",
				value: "**" + cmds[i].use + "**\n",
				inline: true},
			{
				name: "***Aliases***",
				value: "[**" + cmds[i].alias.join(", ") + "**]\n" ,
				inline: true})
		}
	msg.author.send(embed);
}

module.exports = {
	name : "Ahelp",
	alias : ["acmds", "ac"],
	use: "-Ahelp",
	description : "Displays all Admin Commands",
	options: {ShowInHelp: false},
	run : function(msg, client, disc){
		const cmds = client.adminCommands.array();
		printCommandCategories(msg, disc, cmds);
	}
}