module.exports = {
	name: "GangBank",
	alias: ['gbank'],
	use: '-GangBank withdraw [amount]\n' +
		'-GangBank deposit [amount]',
	description: "Store and deposit items in the gang vault",
	options: {ShowInHelp: true, Category: "Gang"},
	run: async function(client, msg, args, discord){
		try{

			if(args.length == 0)
				return client.eventEm.emit('InvalidArgs', msg, this.use);

            if(! await client.gang.user.inGang(client, msg.author.id)) 
			    return client.eventEm.emit('notInAGang', msg);

			const gang = await client.gang.user.getGang(client, msg.author.id);
			let amount = client.utils.suffixCheck(args[1]);

            if(amount == false)
                return client.eventEm.emit('InvalidArgs', msg, this.use);

            if(new RegExp(args[0].toLowerCase()).test('withdraw')){

                if(client.data.cooldown.isOnCooldown(client, msg.author.id, 'bank'))
                    return client.eventEm.emit('Timeout', msg, client.data.cooldown.getTimeLeft(client, msg.author.id, 'bank'));

				if(amount == 'all')
					amount = Number(gang.bank);

                if(withdraw(client, msg, args, gang, amount)){
                    client.eventEm.emit('GangBankWithdraw', msg, gang, amount);
                    client.data.cooldown.addUserToCooldown(client, msg.author.id, 'bank');
                }
				    
            }
			else if(new RegExp(args[0].toLowerCase()).test('deposit')){
				let bankAmount = Number(gang.bank),
					bankSize = Number(client.gang.info.getGangUpgrade(client, gang, 'Bank'));

				if(bankAmount >= bankSize)
					return client.eventEm.emit('MaxBankAccount', msg, gang);

				if(amount == 'all')
					amount = Number((await client._user.get(client, msg.author.id)).bank)

                if(deposit(client, msg, args, gang, (bankSize < (amount + bankAmount) ? bankSize - bankAmount : amount)))
				    client.eventEm.emit('GangBankDeposit', msg, gang, amount);
            }
			else{
				client.eventEm.emit('InvalidArgs', msg, this.use);
			}
            
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}

function withdraw(client, msg, args, gang, amount){
	try{

		if(gang.bank < amount){
			client.eventEm.emit('GangNotEnoughMoney', msg, amount);
			return false;
		}

		client.gang.bank.addBalance(client, gang, -amount);
		client._user.bal.addBalance(client, msg.author.id, amount);
		client.data.cooldown.addUserToCooldown(client, msg.author.id, 'bank')

        return true;
	}catch(e){
		client.eventEm.emit('CommandError', msg, 'GangVault', args, e);
	}
}


async function deposit(client, msg, args, gang, amount){
	try{

		if(!await client._user.bal.enoughMoney(client, msg, amount)) 
			return false;

		client.gang.bank.addBalance(client, gang, amount);
		client._user.bal.addBalance(client, msg.author.id, -amount);

        return true;
	}catch(e){
		client.eventEm.emit('CommandError', msg, 'GangVault', args, e);
	}
}