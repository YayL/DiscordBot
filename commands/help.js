module.exports = {
	name : "Help",
	alias : ["h", "info", "i", "c", "cmds", "commands"],
	use: "-help",
	description : "Displays all available commands",
	options: [true], 
	users: [],
	run : function(msg, client, disc, args, cmds){
		console.log("Check DMs");
		const embed = new disc.MessageEmbed() // Create embeded message
			.setTitle("All server commands") // Set the title
			.setColor('#9aedea') // Give it a color in hexidecimal format
			.setFooter("Anarchy!");
		for(var i = 0; i < cmds.length; i++){ // Loop through command collection
			if(!cmds[i].options[0] || cmds[i].options.length == 0){
				continue;
			}
			embed.addFields({
			name: "---------------------",
			value: "\u200b"},
			{
			name: "**" + cmds[i].name + "**",
			value: cmds[i].description + "\n",
			inline: false},
			{
			name: "***Use:***",
			value: "**" + cmds[i].use + "**\n",
			inline: false},
			{
			name: "***Aliases:***",
			value: "[**" + cmds[i].alias.join(", ") + "**]\n" ,
			inline: true}) // Add a field for command with it's name and description
		}

		msg.author.send(embed); // Send embeded message in the same channel as the command was sent in
	}
}