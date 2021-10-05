const prefix = "-"

/*
name -> Name of command
alias -> List of Aliases
description -> Short description of command
options -> Different options boolean form
run -> Calls command function
*/

function notCommandChannel(client, msg){
	if(client.channelId.commandChannels.includes(msg.channel.id) || client.channelId.lootboxChannels.includes(msg.channel.id)){
		return false;
	}

	if(!msg.deleted)
		msg.delete();

	return !(client.adminList.includes(msg.author.id) && client.s.ADMIN_COMMANDS);
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
		
		let commands = client.commands

		if(client.adminList.includes(msg.author.id) && client.s.ADMIN_COMMANDS){
			commands = client.commands.concat(client.adminCommands); // Combine commands and adminCommands
		}else{
			if(!client.allowCommands)
				return client.eventEm.emit('CommandsToggle', msg);
		}

        if(msg.content.startsWith(prefix)){

			if(notCommandChannel(client, msg)){
				return;
			}


			let tempMessage = msg.content.slice(prefix.length); // Remove prefix from string
			let args = tempMessage.split(" ").filter(arg => arg !== '');

			if(args[0] == undefined) 
				return client.eventEm.emit('CommandNotSpecified', msg);

			CommandName = args[0].toLowerCase();
			args.shift(); // Remove first argument, CommandName, from array
			
			const alias = checkIfAlias(CommandName, commands.array());
			CommandName = alias != undefined ? alias.toLowerCase() : CommandName;

			const commandToRun = commands.get(CommandName);

			if(commandToRun == undefined)
				return client.eventEm.emit('InvalidCommand', msg, CommandName, args);

			try{
				commandToRun.run(client, msg, args, Discord, commands.array());
			}catch(e){
				client.eventEm.emit('CommandError', msg, CommandName, args, e, true);
			}
		}
	}
}
