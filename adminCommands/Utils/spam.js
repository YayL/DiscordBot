module.exports = {
	name: "Spam",
	alias: [],
	use: "-Spam [amount]",
	description: "Send a set amount of messages",
	options: {ShowInHelp: false, Category: 'Utils'},
	run: async function(msg, client, disc, args){
		try{
			for(var i = 0; i<=Number(args[0]); i++){
				msg.channel.send(i);
			}
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
	}
}