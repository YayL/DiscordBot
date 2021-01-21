const prefix = "!"

/* 
name -> Name of command
alias -> List of Aliases
description -> Short description of command
run -> Calls command function
*/


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

module.exports = {
	handleCommand: (msg, client, Discord) => {
		const commands = client.commands
		if(msg.content.startsWith(prefix)){ // If command begins with designated prefix

			var tempMessage = msg.content.slice(1); // Remove prefix from string
			var args = tempMessage.split(" ") // Split the string up into every seperated word by whitespaces(spaces)

			CommandName = args[0].toLowerCase(); // Designate first part of array to be CommandName after it has been turned into all lowercase
			args.splice(args.indexOf(0), 1); // Remove first argument(CommandName) from array

			const alias = checkIfAlias(CommandName, commands.array()); // Call checkIfAlias function 
			if(alias != null){ // Check if alias was found
				CommandName = alias; // If found give the CommandName the parent command of the alias
			}

			try{
				commands.get(CommandName).run(msg, client, commands.array(), Discord, args); // Try executing CommandName; may yield errors
			}catch(e){
				if(e instanceof TypeError){ // Check if the error yielded was a type error(Commonly means that it was unable to find CommandName in command collection)
					console.log("Command was not found");
				}
				console.log(e); // Print the error message in the console
			}
		}
	}
}
