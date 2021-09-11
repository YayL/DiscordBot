const categoryEmojiDict = {
	'Economy': '💰',
	'Gambling': '🎰',
	'Gang': '👪',
	'Items': '📦',
	'User': '🙍',
	'Utils': '🛠️',
	'Voting': '🗳️',
};

function sendDefaultHelpCommand(msg, client, disc, cmds){
	var embed = new disc.MessageEmbed()
		.setAuthor(`List of categories to choose from`)
		.setColor('#41BDB8')
		.setFooter(`-help [category]`);

	for(let category of client.categoryList){
		embed.addFields({
			name: `${categoryEmojiDict[category]} ${category}`,
			value: `\u200b`,
			inline: true
		});
	}

	const filter = (reaction, user) => {
		if(user.id == msg.member.id){
			let index = Object.values(categoryEmojiDict).indexOf(reaction.emoji.name);
			if (index != -1){
				reaction.message.reactions.removeAll()
					.then(message => {
						message.delete();
					});
				sendSpecificHelpCommand(msg, client, disc, Object.keys(categoryEmojiDict)[index], cmds);
				return true;
			}
		}
		return false;
	}

	msg.channel.send(embed)
		.then(message => {
			for(var key in categoryEmojiDict){
				message.react(categoryEmojiDict[key]);
			}
			message.awaitReactions(filter, {time: 25000})
				.then(m => {
					if(!message.deleted)
						message.delete();
				})
		})
}

function sendSpecificHelpCommand(msg, client, disc, category, cmds){
	if (category == undefined) 
		return;

	const categoryIndex = client.categoryList.map((category) => category.toLowerCase()).indexOf(category.toLowerCase())

	if(categoryIndex == -1) 
		return;

	const embed = new disc.MessageEmbed()
		.setAuthor(`${client.categoryList[categoryIndex]}'s Command List`)
		.setColor(`#41BDB8`);

	for(let cmd of cmds){
		if(cmd.options.Category.toLowerCase() != client.categoryList[categoryIndex].toLowerCase() || !cmd.options.ShowInHelp) 
			continue

		embed.addFields({
			name: `${cmd.name}`,
			value: `${cmd.description}`,
			inline: true
		},
		{
			name: `How to Use`,
			value: `**${cmd.use}**`,
			inline: true
		},
		{
			name: `Aliases`,
			value: (cmd.alias.length != 0 ? cmd.alias : '\u200b'),
			inline: true
		});
	}
	
	msg.channel.send(embed);
	
	return true;
}

module.exports = {
	name : "Help",
	alias : ["h", "cmds", "commands"],
	use: "-help [category]",
	description : "Displays all available commands",
	options: {ShowInHelp: true, Category: "Utils"},
	run : function(msg, client, disc, args){
		try{
			const cmds = client.commands.array();
			
			if(sendSpecificHelpCommand(msg, client, disc, args[0], cmds)) 
				return;
			
			sendDefaultHelpCommand(msg, client, disc, cmds);

        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
	}
}