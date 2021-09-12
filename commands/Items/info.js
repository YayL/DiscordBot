module.exports = {
	name: "Info",
	alias: [],
	use: "-Info [item_id]",
	description: "Get some of the basic information about items",
	options: {ShowInHelp: true, Category: "Items"},
	run: function(client, msg, args, discord){
		try{
			const item = client.data.items.getItem(client, Number(args[0]));

			if(item == null) 
				return client.eventEm.emit('ItemNotFound', msg, args[0]);

			var limited = '';

			if(item.tier == 'Limited'){
				limited = `\n\n*Total: ${item.count}*`;
			}

			var embed = new discord.MessageEmbed()
				.setTitle(`ID: ${item.id} - ${item.name}`)
				.setDescription(`**__Description__** \n*${item.description}*\n\n**__Market Value:__ ${client.utils.fixNumber(item.value, true)}**` 
					+ `${limited}`)
				.setColor(`${client.items.color_table[client.items.lookup_table.indexOf(item.tier.toLowerCase())]}`)
				.setFooter(`Origin: ${item.origin}`);

			msg.channel.send(embed);
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}