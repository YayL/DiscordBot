const max_items_per_page = 10;

module.exports = {
	name: "Inventory",
	alias: ['inv'],
	use: "-Inventory [page]",
	description: "Check the items you have in your inventory",
	options: {ShowInHelp: true, Category: "Items"},
	run: async function(client, msg, args, discord){
		try{

			const inventory = await client._user.items.getInventory(client, msg.author.id),
				inventoryLength = Object.values(inventory).length,
				maxPages = Math.ceil(inventoryLength/max_items_per_page) < 1 ? 1 : Math.ceil(inventoryLength/max_items_per_page),
				page = (Number.isNaN(Number(args[0])) ? 1 : (Number(args[0]) > maxPages ? maxPages : (Number(args[0]) < 1 ? 1 : Number(args[0]))));

            sendMessage(client, msg, discord, inventory, inventoryLength, maxPages, page);

        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }
}

async function sendMessage(client, msg, discord, inventory, inventoryLength, maxPages, page){
    let item,
        value_of_inv = 0,
        text = '';

    for(let slot = max_items_per_page*(page-1)+1; slot <= max_items_per_page*page; slot++){
        if(slot > inventoryLength)
            break;

        item = await client.data.items.getItem(client, Object.keys(inventory)[slot-1]);

        value_of_inv += (isNaN(Number(item.	value)) ? 0 : item.value*inventory[item.id].count); // Checks if a value is limited or not

		text += `*(ID:${item.id})* ***${item.name}*** x${inventory[item.id].count} | **__${item.tier.charAt(0).toUpperCase() + item.tier.slice(1)}__**\n`;

	}
	
	let embed = new discord.MessageEmbed()
		.setTitle(`Inventory`)
		.setDescription(`${text}\n\u200b\n$${client.utils.fixNumber(value_of_inv, true)}`)
		.setColor('#4287f5')
		.setFooter(`Page ${page}/${maxPages}`);

    msg.channel.send(embed)
        .then(m => {
            
            const filter = (reaction, user) => {
                if(user.id != msg.author.id)
                    return false;
                
                const index = client.s.LR_EMOJIS.indexOf(reaction.emoji.name);

				if(index != -1){
					sendMessage(client, msg, discord, inventory, inventoryLength, maxPages, page + (index*2)-1);
					if(!m.deleted)
						m.delete();
				}
			}
			
			m.awaitReactions(filter, {time: 45000})
				.then(_ => {
					if(!m.deleted) 
						m.delete();
				});
			
			if(page > 1)
				m.react(client.s.LR_EMOJIS[0]);
			if(page < maxPages)
				m.react(client.s.LR_EMOJIS[1]);
		})
}
