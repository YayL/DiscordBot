module.exports = {
	name : "CreateGuild",
	alias : ["gc"],
	description : "Displays all available commands",
	run : function(msg, client, cmds, disc, args){
		//console.log("1");
		client.guilds.create("New Guild")
			.then(value => {
				value.channels.create('new-general', { reason: 'Needed a cool new channel' })
				.then(channel => {
					let invite = channel.createInvite()
						.then(invite => console.log(invite))
						.catch(console.error);
					console.log(invite.url);
				})
				.catch(console.error);
			})
			.catch(console.error);

	}
}