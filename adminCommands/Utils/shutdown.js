async function beforeExit(msg, client){
	client.utils.clearChat(msg, 100, client.channelId.voting)
		.then(() => {
			client.sleep(3500).then(() => {//Time might need to be increased if we add more stuff for it to do before it turns off
				client.destroy();
				process.exit(1);
		})
	})
}

module.exports = {
	name: "Shutdown",
	alias : ["s"],
	use: "-Shutdown",
	description: "Turns off the bot correctly",
	options: {ShowInHelp: false, Category: 'Utils'},
	run : function(msg, client, disc, args){
		try{
			client.allowCommands = false;
			msg.delete();
			beforeExit(msg, client);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
		
	}
}