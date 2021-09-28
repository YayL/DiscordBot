abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r']
// max 18 jobs to upgrade to from one job

module.exports = {
	name : "Jobs",
	alias : ["j"],
	use: "-Jobs",
	description : "Choose between the available jobs for you to do",
	options: {ShowInHelp: true, Category: "Economy"},
	run : async function(client, msg, args, discord){
		try{

			const user = await client._user.get(client, msg.member.id);

            const currentJob = await client.jobList.get(user.job);

            if(currentJob.requirement > client.data.jobs.expToLevel(user.experience)) 
				return client.eventEm.emit('TooLowLevel', msg, user)

            const availableJobs = currentJob.job_options

		    const filter = async (reaction, user) => {
		        if(user.id != msg.member.id) return false
		        	
		        if(availableJobs.length == 0){
					if(!reaction.message.deleted)
		        		reaction.message.delete();

					if(await client.data.market.getUserCount(client, user.id) > 0) 
						return client.eventEm.emit('HasOpenListings', msg);
		            client.eventEm.emit("rebirth", user, msg.channel); // Rebirth event

                }else {
                    for(i = 0; i < availableJobs.length; i++){
                        if(reaction.emoji.name == client.s.EMOJIS[i]){
							if(!reaction.message.deleted)
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

	        if(availableJobs.length == 0){
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
				if(availableJobs.length == 0)
					message.react(client.s.EMOJIS[0]);
	        });
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
        
    }
}

