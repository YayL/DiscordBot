function printCommandCategories(msg, disc, client, cmds, category){
	const embed = new disc.MessageEmbed() // Create embeded message
			.setTitle("***" + category + " Commands:***") // Set the title
			.setColor('#9aedea') // Give it a color in hexidecimal format
			.setFooter("Anarchy!");
		for(var i = 0; i < cmds.length; i++){ // Loop through command collection
			if(cmds[i].options.ShowInHelp && cmds[i].options.Category == category){
				embed.addFields({
					name: "---------------------",
					value: "\u200b"},
				{
					name: "**" + cmds[i].name + "**",
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
		}
	msg.author.send(embed);
}

module.exports = {
	name : "Help",
	alias : ["h", "info", "i", "cmds", "commands"],
	use: "-help",
	description : "Displays all available commands",
	options: {ShowInHelp: true, Category: "Managment"},
	run : function(msg, client, disc, args){
		const cmds = client.commands.array();
		for(c of client.categoryList){
			printCommandCategories(msg, disc, client, cmds, c);
		}
	}
}