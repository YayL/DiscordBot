const commandHandler = require('../../commandHandler.js');

module.exports = {
	name: "Execute",
	alias: ["exe"],
	use: "-Execute @[user/user_id] [Command Message] ",
	description: "Force a user to execute a command",
	options: {ShowInHelp: false, Category: 'Utils'},
	run: async function(client, msg, args, discord){
		try{
			msg.member = client.utils.getMember(args[1], msg);
            msg.author = msg.mentions.users.array()[0];
            msg.content = args.slice(1).join(" ");

            commandHandler.handleCommand(msg, client, discord);
            
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
	}
}