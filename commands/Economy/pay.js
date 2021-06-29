module.exports = {
	name: "Pay",
	alias: [],
	use: "-Pay @[user] [amount]",
	description: "Give a user some amount of money",
	options: {ShowInHelp: true, Category: 'Economy'},
	run: async function(msg, client, disc, args){
		try{
			const payee = await client.utils.getMember(args[0], msg);
			let amount = client.utils.suffixCheck(args[1])
      if(amount == false) return client.eventEm.emit('InvalidCommand', "Highlow", args);
      if(amount == "all") amount = await client.data.user.getBalance(client, msg.member);

	        if(!await client.data.bal.enoughMoney(client, msg.member, amount)) return;

	        client.data.user.addBalance(client, msg.member, -1*amount, "add")
	        client.data.user.addBalance(client, payee, amount, "add")
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
	}
}
