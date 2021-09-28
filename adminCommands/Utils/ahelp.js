const categoryEmojiDict = {
    'Economy': '💰',
    'Gang': '👪',
    'Items': '📦',
    'Management': '💼',
    'Rules': '⚖️',
    'User': '🙍',
    'Utils': '🛠️',
}

const max_commands_per_page = 8;

function sendDefaultHelpCommand(client, msg, discord){
	var embed = new discord.MessageEmbed()
		.setAuthor(`List of categories to choose from`)
		.setColor('#41BDB8')
		.setFooter(`-help [category]`);

    for(let category of client.adminCategoryList){
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
				sendSpecificHelpCommand(client, msg, discord, Object.keys(categoryEmojiDict)[index], 1);
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

function sendSpecificHelpCommand(client, msg, discord, category, page){
	if (category == undefined) 
		return;

	const categoryIndex = client.adminCategoryList.map((category) => category.toLowerCase()).indexOf(category.toLowerCase())

	if(categoryIndex == -1) 
		return;

	const embed = new discord.MessageEmbed()
		.setAuthor(`${client.adminCategoryList[categoryIndex]}'s Command List`)
		.setColor(`#41BDB8`);
	
	let cmd;

	const cmds = client.adminCommandsCategories[category.toLowerCase()],
		maxPages = Math.ceil(cmds.length/max_commands_per_page);

	for(let index = max_commands_per_page*(page-1); index < max_commands_per_page*page; index++){

		if(index >= cmds.length)
			break;
		
		cmd = client.adminCommands.get(cmds[index]);

		console.log(cmd);

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
	
	embed.setFooter(`${page}/${maxPages}`)

	msg.channel.send(embed)
		.then(newMessage => {

			const filter = (reaction, user) => {
				if(user.id != msg.author.id)
					return false;
				
				const index = client.s.LR_EMOJIS.indexOf(reaction.emoji.name);

				if(index != -1){
					newMessage.delete();
					sendSpecificHelpCommand(client, msg, discord, category, page + (2*index)-1);
				}
			}

			newMessage.awaitReactions(filter, {time: 30000})
				.then(_ => {
					if(!newMessage.deleted)
						newMessage.delete();
				})
				
				if(page > 1)
					newMessage.react(client.s.LR_EMOJIS[0]);
				if(page < maxPages)
					newMessage.react(client.s.LR_EMOJIS[1]);

		})
	
	return true;
}

module.exports = {
	name : "ahelp",
	alias : [],
	use: "-ahelp"
		+ "-ahelp [category]",
	description : "Displays all available admin commands",
	options: {ShowInHelp: true, Category: "Utils"},
	run : function(client, msg, args, discord){
		try{
			
			if(sendSpecificHelpCommand(client, msg, discord, args[0], 1))
				return;
			
			sendDefaultHelpCommand(client, msg, discord);

        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
    }
}
