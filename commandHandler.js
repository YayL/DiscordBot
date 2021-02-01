const func = require('./customMethods.js')

const prefix = "-"

function notCommandChannel(msg, client){
	if(msg.channel.id == client.cmdChannel){
		return false
	}
	func.clearChat(msg, 1);
	return true
}


function checkIfAlias(cmdName, cmds){ // Check if command input is an alias of a "real command", if so return the real command
	for(const cmd of cmds){ // Loop through individual command
		try{
			for(var a of cmd.alias){ // Loop through every alias in command

				if(a.toLowerCase() === cmdName){ // Check if cmdName is the same as Alias in current command iterade to
					return cmd.name; // Return "real command" name 
				}
			}	
		}catch{console.error}
	}
	return null; // Return nothing if not found
}

function checkIfValidUser(user, userList){
	for (allowed of userList){
		if(user.id === allowed.id){
			return true;
		}
	}
	return false;
}

module.exports = {
	handleCommand: (msg, client, Discord) => {
		var commands = client.commands
		if(client.adminList.includes(msg.author.id)){
			commands = client.commands.concat(client.adminCommands); // Combine commands and adminCommands
		}

		if(msg.content.startsWith(prefix)){

			var tempMessage = msg.content.slice(1); // Remove prefix from string
			var args = tempMessage.split(" ");

			CommandName = args[0].toLowerCase();
			args.shift(); // Remove first argument(CommandName) from array

			const alias = checkIfAlias(CommandName, commands.array());
			if(alias != null){ // Check if alias was found
				CommandName = alias.toLowerCase();
			}

			try{
				commands.get(CommandName).run(msg, args, client, Discord, commands.array()); // Try executing CommandName.run; may yield errors
				if(notCommandChannel(msg, client)){return}
			}catch(e){
				if(e instanceof TypeError){ // Check if the error yielded was a type error(Commonly means that it was unable to find CommandName in command collection)
					console.log("\nCommmand was not found:\n");
				}
				console.log(e);
			}
		}
	}
}
