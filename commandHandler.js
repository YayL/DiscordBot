const m = require('./methodsLoader.js')

const prefix = "-"

/*
name -> Name of command
alias -> List of Aliases
description -> Short description of command
options -> Different options boolean form
run -> Calls command function
*/

function notCommandChannel(msg, client, notError){
	if(client.channelId.commandChannels.includes(msg.channel.id)){
		return false
	}
	if(!notError){
		m.utils.clearChat(msg, 1);
	}
	return true
}


function checkIfAlias(cmdName, cmds){
	for(const cmd of cmds){
		for(var a of cmd.alias){

			if(a.toLowerCase() === cmdName){
				return cmd.name;
			}
		}
	}
	return null;
}

module.exports = {
	handleCommand: (msg, client, Discord) => {
		var commands = client.commands
		if(client.adminList.includes(msg.author.id) && client.s.adminCommands){
			commands = client.commands.concat(client.adminCommands); // Combine commands and adminCommands
		}

		if(msg.content.startsWith(prefix)){

			var tempMessage = msg.content.slice(prefix.length); // Remove prefix from string
			var args = tempMessage.split(" ").filter(arg => arg !== '');

			CommandName = args[0].toLowerCase();
			args.shift(); // Remove first argument, CommandName, from array

			const alias = checkIfAlias(CommandName, commands.array());
			CommandName = alias != undefined ? alias.toLowerCase() : CommandName;

			try{
				commands.get(CommandName).run(msg, client, Discord, args, commands.array());
				if(notCommandChannel(msg, client)) return
			}catch(e){
				if(notCommandChannel(msg, client, false)) return
				client.eventEm.emit('CommandError', msg, CommandName, args, e, true)
			}
		}
	}
}
