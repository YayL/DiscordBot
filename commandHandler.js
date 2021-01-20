const prefix = "!"

/* 
name -> Name of command
alias -> List of Aliases
description -> Short description of command
run -> Calls command function
*/


function checkIfAlias(cmdName, cmds){
	for(var key in cmds){
		for(var a in cmds[1][key].Alias){
			if(cmds[key].Alias[a] === cmdName){
				return key;
			}
		}
	}

	return null;
}

module.exports = {
	handleCommand: (msg, commands) => {
		if(msg.content.startsWith(prefix)){

			var tempMessage = msg.content.slice(1);
			var args = tempMessage.split(" ")

			CommandName = args[0].toLowerCase();

			const index = args.indexOf(0);
			args.splice(index, 1);

			const alias = checkIfAlias(CommandName, commands);
			if(alias != null){
				CommandName = alias;
			}

			try{
				commands.get(CommandName).run(msg, args);
			}catch(e){
				if(e instanceof TypeError){
					//console.log(e);
					console.log("Command was not found");
				}
			}
		}
	}
}
