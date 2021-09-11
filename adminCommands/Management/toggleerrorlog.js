module.exports = {
	name : "ToggleErrorLog",
	alias : ["terrlog"],
	use: "-ToggleErrorLog",
	description : "Toggles error logging on discord on/off",
	options: {ShowInHelp: false, Category: 'Management'},
	run : function(msg, client, disc){
		try{
			msg.delete();
			client.s.LOG_ERRORS_TO_DISCORD = (client.s.LOG_ERRORS_TO_DISCORD ? false : true);
            client.eventEm.emit('ErrorToggle', msg);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
		
	}

}