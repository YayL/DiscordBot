const conversionRate = 5e6
const xpRate = 1

module.exports = {
	name : "Transfer",
	alias : ["tr"],
	use: "-Transfer [amount]",
	description : `Transfer Money to XP with a conversion rate of ${xpRate}:$5,000,000`,
	options: {ShowInHelp: true, Category: "User"},
	run : async function(msg, client, disc, args){
        try{
            let amount = client.m.utils.suffixCheck(args[0])
            let totalBal = await client.m.data.bal.getBalance(client, msg.member)
            
            if(amount == false) return client.m.msg.reply(msg, 'XP Conversion', `You can convert $${client.m.utils.numberWithCommas(totalBal)} into ${client.m.utils.numberWithCommas(Math.floor((totalBal*xpRate)/conversionRate))}xp`, disc)
            if(amount == "all") amount = totalBal

            if(!await client.m.data.bal.enoughMoney(client, msg.member, amount)) return

            amount -= amount%conversionRate
            if(amount==0) return client.m.msg.reply(msg, `Too small amount!`, `The amount specified requires to be above $${client.m.utils.numberWithCommas(conversionRate)}`, disc)

            client.m.msg.reply(msg, `You converted $${amount} to xp`, `$${client.m.utils.numberWithCommas(amount)}`
             + ` is equal to ${client.m.utils.numberWithCommas(amount/conversionRate)}xp`, disc)

            client.m.data.bal.updateUserBalance(client, msg.member, -1*amount, "add");
            client.m.data.user.addXP(client, msg, msg.member, amount/conversionRate);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
		
	}
}

