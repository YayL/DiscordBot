abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r']
// max 18 jobs to upgrade to from one job

module.exports = {
	name : "Jobs",
	alias : ["j"],
	use: "-Jobs",
	description : "Choose between the available jobs for you to do",
	options: {ShowInHelp: true, Category: "User"},
	run : async function(client, msg, args, discord){
		try{
			const user = await client._user.get(client, msg.member.id);

			const currentJob = await client.jobList.get(user.job_name);

			if(currentJob.requirement > client.data.jobs.xpToLevel(user.job_xp)) return client.eventEm.emit('TooLowLevel', msg, user)

			const availableJobs = currentJob.job_options

		    const filter = async (reaction, user) => {
		        if(user.id != msg.member.id) return false
		        	
		        if(availableJobs[0] == ''){
		        	reaction.message.delete();
					if(client.data.listings.getUserListingsCount(client, user.id) > 0) return client.eventEm.emit('hasOpenListings', msg);
		            client.eventEm.emit("rebirth", user, reaction.channel); // Rebirth event

		        }else {
		        	for(i = 0; i<availableJobs.length;i++){
		            	if(reaction.emoji.name == client.s.EMOJIS[i]){
		            		reaction.message.delete();
		            		client.eventEm.emit('promotion', user, availableJobs[i]); // Promotion event
						}
	            	}
		        }
	            return false;
	        }

	        // Send message

	        const embed = new discord.MessageEmbed()
		        .setTitle('**__List of Jobs:__**')
	            .setColor("#2fa87a")
	            .setFooter("Make sure to pick the right one for you!");

	        if(availableJobs.length==1 && availableJobs[0] == ''){
	        	embed.addField(`:regional_indicator_${abc[0]}:`, `**Rebirth - Get a Money multiplier**`,true);
		    }else{ 
		    	for(i = 0; i<availableJobs.length;i++){
		        	embed.addField(`:regional_indicator_${abc[i]}:`, `**${availableJobs[i]}`
		        		+ ` - $${client.utils.fixNumber(client.jobList.get(availableJobs[i]).base_pay, true)}**`,true);
	        	}
	        }

		    msg.channel.send(embed)
	        .then(message => {
	        	message.awaitReactions(filter)
	            for(i = 0; i<availableJobs.length;i++){
	            	message.react(client.s.EMOJIS[i]).catch(e => {return});
	            }
	        });
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
		
	}
}

