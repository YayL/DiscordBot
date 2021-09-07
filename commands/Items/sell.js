module.exports = {
    name: "Sell",
    alias: [],
    use: "-sell [item_id] [amount]\n-sell [tier/all]",
    description: "Sell an item that is in your inventory",
    options: {ShowInHelp: true, Category: "Items"},
    run: async function(msg, client, discord, args){
        try{
            const inventory = await client._user.items.getInventory(client, msg.author.id), 
                item_id = Number(args[0])

            if(Object.keys(inventory).length == 0) 
                return client.eventEm.emit('NotEnoughItems', msg, 1, false);

            if(isNaN(item_id)) 
                return sellTiers(client, msg, discord, args, inventory, this.use)

            // Get item
            const item = client.data.items.getItem(client, item_id);

            // Check if item exists
            if(item == null) 
                return client.eventEm.emit('ItemNotFound', msg, item_id)

            // Check if the item has a market value
            if(isNaN(Number(item.value))) return

            // Check if user has the item
            if(!Object.keys(inventory).includes(`${item.id}`)) 
                return client.eventEm.emit('NotEnoughItems', msg, 1, item.name);
            
            var amount = (args.length >= 1 ? (args[1] == 'all' ? 
                inventory[item.id].count : (isNaN(Number(args[1])) ? 1 : Number(args[1]))) : 1)

            // Check if user has enough of the item
            if(amount > inventory[item.id].count) return client.eventEm.emit('NotEnoughItems', msg, amount, item)

            client._user.items.delItems(client, msg.author.id, [{id: item_id, count: amount}])
            client._user.bal.addBalance(client, msg.author.id, item.value * amount)
                
            sendSellMessage(client, msg, discord, item.value*amount, item.name, amount)
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
        
    }
}

function sellTiers(client, msg, discord, args, inventory, use){

    const tier = args[0].toLowerCase()
    const sellAll = tier == 'all' ? true : false

    if(!sellAll && !client.items.lookup_table.includes(tier)) 
        return client.eventEm.emit('InvalidArgs', msg, use)

    var item, totalPrice = 0, totalItems = 0, items = [];

    for(item_id in inventory){
        item = client.data.items.getItem(client, item_id)
        if(item.tier == 'limited' || isNaN(Number(item.value)) || (!sellAll && item.tier.toLowerCase() != tier)) 
            continue
        
        items.push({id: item_id, count: inventory[item_id].count})
        totalPrice += item.value * inventory[item_id].count
        totalItems += inventory[item_id].count
    }

    client._user.items.delItems(client, msg.author.id, items)
    client._user.bal.addBalance(client, msg.author.id, totalPrice)

    sendSellMessage(client, msg, discord, totalPrice, (sellAll ? 'All Items' : `All ${client.utils.upFirstLetter(tier)} items`), totalItems)

}

function sendSellMessage(client, msg, discord, price, name, amount){
    var embed = new discord.MessageEmbed()
        .setTitle(`Market Sale: ${name}`)
        .setDescription(`You sold **x${amount}** for a total of **$${client.utils.fixNumber(price, true)}**`)
        .setColor(`#51fc62`)

    msg.channel.send(embed);
}