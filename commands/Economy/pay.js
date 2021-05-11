module.exports = {
	name: "Pay",
	alias: [],
	use: "-Pay @[user] [amount]",
	description: "Give a user some amount of money",
	options: {ShowInHelp: false},
	run: async function(msg, client, disc, args){
		const payee = await client.m.utils.getMember(args[0], msg);
		let amount = client.m.utils.suffixCheck(args[1])
        if(amount == false) return client.eventEm.emit('InvalidCommand', "Highlow", args);
        if(amount == "all") amount = await client.m.data.bal.getBalance(client, msg.member);

        if(!await client.m.data.bal.enoughMoney(client, msg.member, amount)) return;

        client.m.data.bal.updateUserBalance(client, msg.member, -1*amount, "add")
        client.m.data.bal.updateUserBalance(client, payee, amount, "add")
	}
}