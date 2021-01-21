module.exports = {
	name : "Help",
	alias : ["h", "info", "i", "c", "cmds", "commands"],
	description : "Displays all available commands",
	run : function(msg, client, cmds, disc, args){
		console.log("Check DMs");

		const embed = new disc.MessageEmbed() // Create embeded message
			.setTitle("All server commands") // Set the title
			.setColor('#9aedea') // Give it a color in hexidecimal format
			.setFooter("Anarchy!");
		for(var i = 0; i < cmds.length; i++){ // Loop through command collection
			embed.addFields({
			name: "---------------------",
			value: "\u200b"},
			{
			name: cmds[i].name,
			value: cmds[i].description,
			inline: false},
			{
			name: "Alias",
			value: "[" + cmds[i].alias.join(", ") + "]",
			inline: true}) // Add a field for command with it's name and description
		}

		msg.channel.send(embed); // Send embeded message in the same channel as the command was sent in
	}
}