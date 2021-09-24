module.exports = {
	name: "Steal",
	alias: [],
	use: "-Steal @[user]",
	description: "Attempt to steal money from a user",
	options: {ShowInHelp: true, Category: "Gambling"},
	run: async function(client, msg, args, discord){
		try{

            const target = msg.mentions.users.array()[0],
                typeValue = Math.random();

            if(args.length == 0 || target == undefined)
                return client.eventEm.emit('InvalidArgs', msg, this.use);

            if(target.id == msg.author.id)
                return client.eventEm.emit('NotYourself', msg);

			if(client.data.cooldown.isOnCooldown(client, msg.author.id, 'steal'))
                return client.eventEm.emit('Timeout', msg, client.data.cooldown.getTimeLeft(client, msg.author.id, 'steal'));

            const offsetValue = 0.7;
            const difference = Number(await client._user.bal.getBalance(client, target.id))/(Number(await client._user.bal.getBalance(client, msg.author.id))+1);
            
            let probability = 1 - (2 * offsetValue * Math.log(20)/(Math.pow(Math.log(difference), 2))),
                amount = 0;

            if(difference <= 500)
                probability = 0.6;
            
            // Success
            if(typeValue >= probability){
                amount = Number(await client._user.get(client, target.id, 'bal')) * Math.random() * (0.05-0.001) + 0.001;
            }
            // Fail
            else if(typeValue >= probability-0.3){
                amount = -Number(await client._user.get(client, msg.author.id, 'bal')) * Math.random() * (0.1-0.005) + 0.005;
            }

            amount = Math.floor(amount);

            if(amount != 0){
                client._user.bal.addBalance(client, msg.author.id, amount);
                client._user.bal.addBalance(client, target.id, -amount);
            }

            client.data.cooldown.addUserToCooldown(client, msg.author.id, 'steal');
            client.eventEm.emit('Steal', msg, target, amount);

		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e)
		}
		
	}
}
