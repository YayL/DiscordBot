module.exports = {
	name: "Pay",
	alias: [],
	use: "-Pay @[user] [amount]",
	description: "Give a user some amount of money",
	options: {ShowInHelp: true, Category: 'Economy'},
	run: async function(client, msg, args, discord){
		try{
			const payee = msg.mentions.users.array()[0];
			let amount = client.utils.suffixCheck(args[1]);

            if(amount == false || payee == null) 
                return client.eventEm.emit('InvalidArgs', msg, this.use);

			if(client.data.cooldown.isOnCooldown(client, msg.author.id, 'pay'))
				return client.eventEm.emit('Timeout', msg, client.data.cooldown.getTimeLeft(client, msg.author.id, 'pay'));

      		if(amount == "all") 
				amount = await client._user.bal.getBalance(client, msg.member.id);

			if(amount < 1)
                return client.eventEm.emit('tooSmallAmount', msg, 1)

	        if(!await client._user.bal.enoughMoney(client, msg, amount)) 
				return;

            client._user.bal.addBalance(client, msg.member.id, -1*amount);
            client._user.bal.addBalance(client, payee.id, amount);

			client.data.cooldown.addUserToCooldown(client, msg.author.id, 'pay');

			client.eventEm.emit('payment', msg, payee, amount);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
    }
}
