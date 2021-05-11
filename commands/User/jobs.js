abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r']
// max 18 jobs to upgrade to from one job

module.exports = {
	name : "Jobs",
	alias : ["j"],
	use: "-Jobs",
	description : "Choose between the available jobs for you to do",
	options: {ShowInHelp: true, Category: "User"},
	run : async function(msg, client, disc){

		const user = await client.m.data.user.get(client, msg.member, '*')
		const currentJob = client.jobList.get(user.job_name.split(' ').join(''));

		if(currentJob.requirement + 1 > client.m.data.jobs.xpToLevel(user.job_xp)) return client.eventEm.emit('ToLowLevel', msg, user)

		const availableJobs = currentJob.job_options.split(",")

	    const filter = async (reaction, user) => {
	        if(user.id != msg.member.id) return false
	        	
	        if(availableJobs.length==1 && availableJobs[0] == ''){
	        	reaction.message.delete();
	            client.eventEm.emit("rebirth", user, reaction.channel); // Rebirth event

	        }else {
	        	for(i = 0; i<availableJobs.length;i++){
	            	if(reaction.emoji.name == client.emoji[i]){
	            		reaction.message.delete();
	            		client.eventEm.emit('promotion', user, availableJobs[client.emoji.indexOf(reaction.emoji.name)]); // Promotion event
					}
            	}
	        }
            return false;
        }

        // Send message

        const embed = new disc.MessageEmbed()
	        .setTitle('**__List of Jobs:__**')
            .setColor("#2fa87a")
            .setFooter("Make sure to pick the right one for you!");

        if(availableJobs.length==1 && availableJobs[0] == ''){
        	embed.addField(`:regional_indicator_${abc[0]}:`, `**Rebirth - Get a Money multiplier**`,true);
	    }else{ 
	    	for(i = 0; i<availableJobs.length;i++){
	        	embed.addField(`:regional_indicator_${abc[i]}:`, `**${availableJobs[i]} - $${client.jobList.get(availableJobs[i]).base_pay}**`,true);
        	}
        }

	    msg.channel.send(embed)
        .then(message => {
        	message.awaitReactions(filter)
            for(i = 0; i<availableJobs.length;i++){
            	if(!message.deleted){
            		message.react(client.emoji[i]);
            	}
            }
        }).catch(e => {});
	}
}

