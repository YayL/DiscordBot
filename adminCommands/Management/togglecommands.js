module.exports = {
	name : "ToggleCommands",
	alias : ["tcmds"],
	use: "-ToggleCommands",
	description : "Toggle commands on/off",
	options: {ShowInHelp: false, Category: 'Management'},
	run : function(client, msg, args, discord){
		try{
			msg.delete();
			client.allowCommands = (client.allowCommands ? false : true);
			client.eventEm.emit('CommandsToggle', msg);
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}

}