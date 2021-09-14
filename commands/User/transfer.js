const moneyRate = 5e7;
const xpRate = 1;

module.exports = {
	name : "Transfer",
	alias : ["tr"],
	use: "-Transfer [amount]",
	description : `Transfer Money to XP with a conversion rate of ${xpRate}xp:$${moneyRate}`,
	options: {ShowInHelp: true, Category: "User"},
	run : async function(client, msg, args, discord){
		try{
			let amount = client.utils.suffixCheck(args[0]), totalBal = await client._user.bal.getBalance(client, msg.member.id);
			const currentXP = await client._user.get(client, msg.author.id, 'job_xp');

			if(amount == false) 
				return client.msg.reply(msg, 'XP Conversion',
				 `You can convert $${client.utils.fixNumber(totalBal, true)} into ${client.utils.fixNumber(Math.floor((totalBal*xpRate)/moneyRate))}xp`, discord);

			if(amount == "all")
				amount = totalBal;

			if(currentXP + amount/moneyRate > client.s.MAX_XP) 
				amount = (client.s.MAX_XP - currentXP)*moneyRate;

			if(!await client._user.bal.enoughMoney(client, msg.member.id, amount)) 
				return client.eventEm.emit('notEnoughMoney', msg);

			amount -= amount%moneyRate;

			if(amount == 0) 
				return client.msg.reply(msg, `Too small amount!`, `The amount specified requires to be above $${client.utils.fixNumber(moneyRate)}`, discord);

			client.msg.reply(msg, `You converted $${client.utils.fixNumber(amount, true)} to xp`, `$${client.utils.fixNumber(amount, true)}`
			 + ` is equal to ${client.utils.fixNumber(amount/moneyRate, true)}xp`, discord);

			client._user.bal.addBalance(client, msg.member.id, -1*amount);
			client._user.xp.addXP(client, msg, msg.member.id, amount/moneyRate);
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}

