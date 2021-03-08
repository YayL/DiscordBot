abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r']
// max 18 jobs to upgrade to from one job

module.exports = {
	name : "Jobs",
	alias : ["j"],
	use: "-Jobs",
	description : "Choose between the available jobs for you to do",
	options: {ShowInHelp: true, Category: "User"},
	run : async function(msg, client, disc){

		const user = await client.m.data.user.get(client, msg.member, "*")
		const currentJob = client.jobList.get(user.job_name.split(' ').join(''));

		if(currentJob.requirement+1 > client.m.data.jobs.xpToLevel(user.job_xp)) return client.eventEm.emit('ToLowLevel', msg, user)

		const availableJobs = currentJob.job_options.split(",")

        const embed = new disc.MessageEmbed()
	        .setTitle('**__List of Jobs:__**')
            .setColor("#2fa87a")
            .setFooter("Make sure to pick the right one for you!");

	    for(i = 0; i<availableJobs.length;i++){
	        embed.addField(`:regional_indicator_${abc[i]}:`, `**${availableJobs[i]} - $${client.jobList.get(availableJobs[i]).base_pay}**`,true);
        }
	    const filter = (reaction, user) => {
	        if(user.id != msg.member.id) return false
            for(i = 0; i<availableJobs.length;i++){
	            if(reaction.emoji.name == client.emoji[i]){
	            	reaction.message.delete();
	            	client.con.query(`UPDATE user SET job_name = '${availableJobs[client.emoji.indexOf(reaction.emoji.name)]}' WHERE id = ${msg.member.id}`);
				}
            }
            return false;
        }
	    msg.channel.send(embed)
        .then(message => {
        	message.awaitReactions(filter)
            for(i = 0; i<availableJobs.length;i++){
                message.react(client.emoji[i]);
            }
        })
	}
}

