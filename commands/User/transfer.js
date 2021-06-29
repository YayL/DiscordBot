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
            let amount = client.utils.suffixCheck(args[0])
            let totalBal = await client.data.user.getBalance(client, msg.member)
            
            if(amount == false) return client.msg.reply(msg, 'XP Conversion', `You can convert $${client.utils.numberWithCommas(totalBal)} into ${client.utils.numberWithCommas(Math.floor((totalBal*xpRate)/conversionRate))}xp`, disc)
            if(amount == "all") amount = totalBal

            if(!await client.data.bal.enoughMoney(client, msg.member, amount)) return

            amount -= amount%conversionRate
            if(amount==0) return client.msg.reply(msg, `Too small amount!`, `The amount specified requires to be above $${client.utils.numberWithCommas(conversionRate)}`, disc)

            client.msg.reply(msg, `You converted $${amount} to xp`, `$${client.utils.numberWithCommas(amount)}`
             + ` is equal to ${client.utils.numberWithCommas(amount/conversionRate)}xp`, disc)

            client.data.user.addBalance(client, msg.member, -1*amount, "add");
            client.data.user.addXP(client, msg, msg.member, amount/conversionRate);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
		
	}
}

