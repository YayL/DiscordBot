module.exports = {
	name : "CreateGuild",
	alias : ["gc"],
	description : "Displays all available commands",
	run : function(msg, args, client, disc){
		//client.msg.log("DEBUG", "1");
		client.guilds.create("New Guild")
			.then(value => {
				value.channels.create('new-general', { reason: 'Needed a cool new channel' })
				.then(channel => {
					let invite = channel.createInvite()
						.then(invite => client.msg.log("INFO", invite))
						.catch(console.error);
					client.msg.log("INFO", invite.url);
				})
				.catch(console.error);
			})
			.catch(console.error);

	}
}
