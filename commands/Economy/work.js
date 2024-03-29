const xpTop = 50,
	xpBottom = 5;

module.exports = {
	name : "Work",
	alias : ['w'],
	use: "-Work",
	description : "Earn some cash from the job you have",
	options: {ShowInHelp: true, Category: "Economy"},
	run : async function(client, msg, args, discord){

        try{
            const user = await client._user.get(client, msg.author.id);

            if(user.job == "Unemployed") 
                return client.eventEm.emit('notEmployed', msg)

			if(client.data.cooldown.isOnCooldown(client, msg.author.id, 'work')) 
				return client.eventEm.emit('Timeout', msg, client.data.cooldown.getTimeLeft(client, msg.author.id, 'work'));
			
			let multiplier = client._user.calculateMultiplier(client, msg.member.roles.cache);

			let xp_grant = Math.floor(Math.random() * (xpTop - xpBottom + 1) + xpBottom) * (multiplier != 0 ? multiplier : 1),
				base_pay = client.jobList.get(user.job).base_pay,
				money_grant = Math.floor(base_pay * ((0.6*Math.random())/3 + 1))*(user.rebirths+1);

			const gang = await client.gang.user.getGang(client, msg.author.id);

			if(await client.gang.user.inGang(client, msg.author.id, gang)){
				client.gang.xp.addExp(client, msg, gang, xp_grant*(Math.random() * 0.4));
			}

			client.msg.reply(msg, 
					"Great work!", 
					`You earned **${xp_grant}xp**\n and 💵 **$${client.utils.fixNumber(money_grant, true)}**`,
					discord);
			
			client._user.xp.addExp(client, msg, msg.member.id, xp_grant, true);
			client._user.bal.addBalance(client, msg.author.id, money_grant);
			client.data.cooldown.addUserToCooldown(client, msg.author.id, 'work');
			
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
    }
}

