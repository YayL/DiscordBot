module.exports = {
	name: "MarketAdd",
	alias: ["ma"],
	use: "-MarketAdd [item_id] [amount] [price] [time_duration(30min miniumum)]",
	description: "Create a market listing for an item",
	options: {ShowInHelp: true, Category: "Economy"},
	run: async function(client, msg, args, discord){
		try{

			const item_id = args[0], 
				amount = args[1] == "all" ? -1 : client.utils.suffixCheck(args[1]), 
				inventory = await client._user.items.getInventory(client, msg.author.id),
				userListingCount = client.data.market.getUserCount(client, msg.author.id),
				deadline = client.utils.timeParser(args[3]);
			
			if(Number.isNaN(Number(deadline)) && Number(deadline) > 30*60) 
				return client.eventEm.emit('InvalidArgs', msg, this.use);

			if(userListingCount >= client.s.maxListings) 
				return client.eventEm.emit('TooManyListings', msg);

			if(!client.data.items.isItem(client, item_id)) 
				return client.eventEm.emit('ItemNotFound', msg, item_id);
			
			if(!client._user.items.hasItem(inventory, item_id, amount))
                return client.eventEm.emit('NotEnoughItems', msg, amount, client.data.items.getItem(client,item_id).name);

			if(amount == -1) 
				amount = inventory[item_id].count;
			
			const item = client.data.items.getItem(client,item_id),
				price = client.utils.suffixCheck(args[2]);

            client.data.market.add(client, msg.author.id, item_id, amount, item.tier.toLowerCase(), Math.ceil(Date.now()/1000)+deadline, price, userListingCount);
			client._user.items.delItems(client, msg.author.id, [{id: item_id, count: amount}]);
			client.eventEm.emit('newListing', msg, item.name, amount);

		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e)
		}
		
	}
}