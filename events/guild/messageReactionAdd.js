const updaterules = require('./../../loaders/updateRules.js')

function checkVotes(reaction, client, disc){
	const command = client.votes.get(reaction.message)
	command[0].run(command[1]);
	reaction.message.delete();
	updaterules.update(client, disc, reaction.message);
}

//(Math.ceil((reaction.message.guild.memberCount-client.botCount)/2))

module.exports = (client, disc, reaction, user) => {
	if(reaction.message.channel.id == client.channelId.voting 
		&& reaction.count >= 2){
		checkVotes(reaction, client, disc);
	}
}