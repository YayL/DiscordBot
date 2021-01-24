const func = require('./../../customMethods.js');

module.exports = (client, disc) => {
	console.log("Yeah, hello?");

	client.guilds.fetch('801908963275702314')
	.then(guild => {
		guild.channels.cache.get('801914827760205885').fetch()
		.then(channel => {
			channel.messages.fetch().catch(console.error);
		})
	})
}

