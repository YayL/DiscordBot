module.exports = {
	name: "Pay",
	alias: [],
	use: "-Pay @[user] [amount]",
	description: "Give a user some amount of money",
	options: {ShowInHelp: true, Category: 'Economy'},
	run: async function(msg, client, disc, args){
		try{
			const payee = await client.utils.getMember(args[0], msg);
			let amount = client.utils.suffixCheck(args[1]);

      		if(amount == false || payee == null) 
				return client.eventEm.emit('InvalidArgs', msg, this.use);

      		if(amount == "all") 
				amount = await client._user.bal.getBalance(client, msg.member.id);

	        if(!await client._user.bal.enoughMoney(client, msg.member.id, amount)) 
				return;

	        client._user.bal.addBalance(client, msg.member.id, -1*amount);
	        client._user.bal.addBalance(client, payee.id, amount);

			client.eventEm.emit('payment', msg, payee, amount);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
	}
}
