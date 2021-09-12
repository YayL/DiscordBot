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
				page = (Number.isNaN(Number(args[0])) ? 1 : (Number(args[0]) > maxPages ? maxPages : (Number(args[0]) < 1 ? 1 : Number(args[0]))));

			let maxPages = Math.ceil(inventoryLength/max_items_per_page);

			if(maxPages == 0) 
				maxPages = 1;

			let item,
				value_of_inv = 0,
				text = '';

			for(let slot = max_items_per_page*(page-1)+1; slot <= max_items_per_page*page; slot++){
				if(slot > inventoryLength)
					break;

				item = await client.data.items.getItem(client, Object.keys(inventory)[slot-1]);

				value_of_inv += (isNaN(Number(item.value)) ? 0 : item.value*inventory[item.id].count); // Checks if a value is limited or not

				text += `*${slot})* *(ID:${item.id})* ***${item.name}*** x${inventory[item.id].count} | **__${item.tier.charAt(0).toUpperCase() + item.tier.slice(1)}__**\n`;

			}
			
			let embed = new discord.MessageEmbed()
				.setTitle(`Inventory`)
				.setDescription(`${text}\n--------------------\n $${client.utils.fixNumber(value_of_inv, true)}\n--------------------`)
				.setColor('#4287f5')
				.setFooter(`Page ${page}/${maxPages}`);

			msg.channel.send(embed);
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}