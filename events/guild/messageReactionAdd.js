const updaterules = require('./../../loaders/updateRules.js')

function checkVotes(reaction, client, disc){
	const command = client.votes.get(reaction.message)
	command[0].run(client, command[1]);
	reaction.message.delete();
	updaterules.update(client, disc, reaction.message);
}

//

module.exports = (client, disc, reaction) => {
	if(reaction.message.channel.id == client.channelId.voting && reaction.emoji.name == '✅'
		&& reaction.count >= Math.floor((reaction.message.guild.memberCount-client.botCount)*client.s.MAJORITY_RATE)+1){
		checkVotes(reaction, client, disc);
	}
}