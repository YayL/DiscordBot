const lookup_table = require('../../info/Items.js').lookup_table.slice(0, -3)
const color_table = require('../../info/Items.js').color_table

const table = require('../../info/Items.js').lootbox_rates

const max_lootboxes = (rebirths) => (100*rebirths > 1e7) ? 1e7 : 100*rebirths

const costCalculate = (tier) => Math.pow(10, 3*(lookup_table.indexOf(tier)+1)+2)

module.exports = {
	name: "Lootbox",
	alias: ["loot"],
	use: "-Lootbox [tier] [amount/max]",
	description: "Open lootboxes for certain awards",
	options: {ShowInHelp: true, Category: "Items"},
	run: async function(msg, client, disc, args){
		try{
			const tier = args.length >= 1 ? args[0].toLowerCase() : '';

			if(!lookup_table.includes(tier)){
				return client.eventEm.emit('unknownTier', msg, lookup_table)
			}

			if(args.length < 2) return sendLootInfo(client, disc, msg, tier, costCalculate(tier), color_table[lookup_table.indexOf(tier)])
			
			const rebirths = await client._user.get(client, msg.author.id, 'rebirths')+1

			const amount = args.length >= 1 ? ((args[1].toLowerCase()=='max') ? max_lootboxes(rebirths) : (0 < Number(args[1]) ? (Number(args[1]) < max_lootboxes(rebirths) ? Number(args[1]) : max_lootboxes(rebirths)) : 1)) : 1;
			const cost = costCalculate(tier)*amount
			if(!await client._user.bal.enoughMoney(client, msg, msg.member.id, cost)) return

			await client._user.bal.addBalance(client, msg.author.id, -1*cost)

			var obj_list = []

			for(var count = 0; count < amount; count++){
				client.eventEm.emit('openLootBox', msg, tier, obj_list)
			}
			sendRewardMessage(client, disc, msg, tier, cost, amount, obj_list)
			client._user.items.addItems(client, msg.author.id, obj_list);

		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e)
		}
		
	}
}

function sendRewardMessage(client, disc, msg, tier, cost, amount, obj_list){

	const value_of_box = obj_list.reduce((total, val) => total + (isNaN(Number(val.obj.value)) ? 0 : val.obj.value)*val.count, 0)

	var text = '';
	obj_list = client.data.items.sortItems(obj_list, true)
	for(o of obj_list){
		text += `x${o.count} ${o.name}: $${client.utils.fixNumber(o.obj.value, true)} | ${o.obj.tier.charAt(0).toUpperCase() + o.obj.tier.slice(1)}\n`
	}

	const embed = new disc.MessageEmbed()
	    .setTitle(`${msg.author.username}'s x${amount} ${tier.charAt(0).toUpperCase() + tier.slice(1)} lootbox:`)
	    .setDescription(`${text}\n\nProfit: ${client.utils.fixNumber(value_of_box-cost, true)}`)
	    .setColor(color_table[lookup_table.indexOf(tier)])
	    .setFooter(`Price: $${client.utils.fixNumber(cost, true)} | Keep going! You'll find something awesome!`);

	msg.channel.send(embed);

}

function sendLootInfo(client, disc, msg, case_tier, cost, color){

	var text = '', inc = 0;
	for(v of table[case_tier]){
		text += `${lookup_table[inc]}: ${v*100}%\n`
		inc++;
	}
	
	const embed = new disc.MessageEmbed()
	    .setTitle(`${case_tier} Lootbox rewards:`)
	    .setDescription(text)
	    .setColor(color)
	    .setFooter(`Price: $${client.utils.fixNumber(cost, true)} | Try your luck and buy one or two, you'll find something awesome!`);

	msg.channel.send(embed);
	
}
