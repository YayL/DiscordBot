function checkVotes(reaction, client){
	const command = client.votes.get(reaction.message)
	command[0].run(command[1]);
}
//Math.ceil((reaction.message.guild.memberCount-client.botCount)*client.settings.majorityRate)
module.exports = (client, disc, reaction, user) => {
	if(reaction.message.channel.id == client.channelId.voting 
		&& reaction.count >= 3){
		checkVotes(reaction, client);
	}
}