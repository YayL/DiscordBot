const max_items_per_page = 10;

module.exports = {
	name: "Inventory",
	alias: ['inv'],
	use: "-Inventory [page]",
	description: "Check the items you have in your inventory",
	options: {ShowInHelp: true, Category: "Items"},
	run: async function(msg, client, disc, args){
		try{
			var inventory = await client.data.user.get(client, msg.author, 'inventory');

			if(`${inventory}`.toLowerCase() == 'null') inventory = {};
			else inventory = JSON.parse(inventory);


			const inv_length = Object.keys(inventory).length
			var max_pages = Math.floor((inv_length-1)/max_items_per_page)+1
			if(max_pages < 1) max_pages = 1
			const page = isNaN(Number(args[0])) ? 1 : (0 < Number(args) ? (Number(args[0]) < max_pages ? Number(args[0]) : max_pages) : 1 )


			const offset = page < max_pages ? max_items_per_page : inv_length-(max_items_per_page*(max_pages-1))

			var text = '', item;
			for(var slot = max_items_per_page*(page-1)+1; slot <= max_items_per_page*(page-1)+offset; slot++){
				item = await client.data.items.getItem(client, Object.keys(inventory)[slot-1])
				text += `*${slot})* *(ID:${item.id})* ***${item.name}*** x${inventory[item.id].count} | **__${item.tier}__**\n`
			}
			
			var embed = new disc.MessageEmbed()
				.setTitle(`Inventory`)
				.setDescription(text)
				.setColor()
				.setFooter(`Page ${page}/${max_pages}`)

			msg.channel.send(embed);
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e)
		}
		
	}
}