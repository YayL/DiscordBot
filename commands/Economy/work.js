const xpTop = 40,
	xpBottom = 5;

module.exports = {
	name : "Work",
	alias : ["w"],
	use: "-Work",
	description : "Earn some cash from the job you have",
	options: {ShowInHelp: true, Category: "Economy"},
	run : async function(client, msg, args, discord){

		try{
			const user = await client._user.get(client, msg.author.id, '*');

			if(user.job_name == "Unemployed") 
				return client.eventEm.emit('notEmployed', msg)

			if(client.data.cooldown.isOnCooldown(client, msg.author.id, 'work')) 
				return client.eventEm.emit('WorkTimeout', msg, client.data.cooldown.getTimeLeft(client, msg.author.id, 'work'));

			var xp_grant = Math.floor(Math.random() * (xpTop - xpBottom + 1) + xpBottom),
				base_pay = client.jobList.get(user.job_name).base_pay,
				money_grant = Math.floor(base_pay * ((0.6*Math.random())/3 + 1))*(user.rebirths+1);

			client.msg.reply(msg, 
					"Great work!", 
					`You earned **${xp_grant}xp**\n and **$${client.utils.fixNumber(money_grant, true)}**`,
					discord);
			
			client._user.xp.addXP(client, msg, msg.member.id, xp_grant, true);
			client._user.bal.addBalance(client, msg.author.id, money_grant);
			client.data.cooldown.addUserToCooldown(client, msg.author.id, 'work');
			
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
	}
}

