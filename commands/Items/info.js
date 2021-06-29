module.exports = {
	name: "Info",
	alias: [],
	use: "-Info [item_id]",
	description: "Get some of the basic information about items",
	options: {ShowInHelp: true, Category: "Items"},
	run: function(msg, client, disc, args){
		try{
			
			const item = client.data.items.getItem(client, Number(args[0]))

			if(item == 'Not Found') return;

			var limited = '';
			if(item.tier == 'Limited'){
				limited = `\n\n*Total: ${item.count}*`
			}
			var embed = new disc.MessageEmbed()
				.setTitle(`ID: ${item.id} - ${item.name}`)
				.setDescription(`***__Description:__*** \n*${item.description}*${limited}`)
				.setColor(`${client.items.color_table[client.items.lookup_table.indexOf(item.tier.toLowerCase())]}`)
				.setFooter(`Origin: ${item.origin}`)

			msg.channel.send(embed);
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e)
		}
		
	}
}