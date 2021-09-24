const lookup_table = require('../../info/Items.js').lookup_table.slice(0, -3);
const color_table = require('../../info/Items.js').color_table;

const table = require('../../info/Items.js').lootbox_rates;

const max_lootboxes = (rebirths) => (100*rebirths > 1e7) ? 1e7 : 100*rebirths;

const costCalculate = (tier) => Math.pow(10, 3 * (lookup_table.indexOf(tier) + 1) + 2);

module.exports = {
	name: "Lootbox",
	alias: ["loot"],
	use: "-Lootbox [tier] [amount/max]",
	description: "Open lootboxes for certain awards",
	options: {ShowInHelp: true, Category: "Items"},
	run: async function(client, msg, args, discord){
		try{
			
			if(!client.channelId.lootboxChannels.includes(msg.channel.id))
				return msg.delete();

			const tier = args.length >= 1 ? args[0].toLowerCase() : '';

			if(!lookup_table.includes(tier))
				return client.eventEm.emit('unknownTier', msg, lookup_table);

			if(args.length < 2) 
				return sendLootInfo(client, discord, msg, tier, costCalculate(tier), color_table[lookup_table.indexOf(tier)]);
			
			const rebirths = await client._user.get(client, msg.author.id, 'rebirths') + 1;
			const amount = args.length >= 1 
				? ((args[1].toLowerCase() == 'max') 
					? max_lootboxes(rebirths) 
					: 0 < Number(args[1]) 
						? (Number(args[1]) < max_lootboxes(rebirths) 
							? Number(args[1]) 
							: max_lootboxes(rebirths)) 
						: 1)
				: 1;
				
			const cost = costCalculate(tier)*amount;

			if(! await client._user.bal.enoughMoney(client, msg, cost)) return;

			if(client.data.cooldown.isOnCooldown(client, msg.author.id, 'lootbox'))
				return client.eventEm.emit('Timeout', msg, client.data.cooldown.getTimeLeft(client, msg.author.id, 'lootbox'));

			client._user.bal.addBalance(client, msg.author.id, -1*cost);

			const obj_list = getItem(client, tier, amount);

			sendRewardMessage(client, discord, msg, tier, cost, amount, obj_list);
			client.data.cooldown.addUserToCooldown(client, msg.author.id, 'lootbox');
			client._user.items.addItems(client, msg.author.id, obj_list);

		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}

function sendRewardMessage(client, discord, msg, tier, cost, amount, obj_list){

	const value_of_box = obj_list.reduce((total, val) => total + (isNaN(Number(val.obj.value)) ? 0 : val.obj.value)*val.count, 0);

	let text = '';
	obj_list = client.data.items.sortItems(obj_list, true);

	for(o of obj_list){
		text += `x${o.count} ${o.name}: $${client.utils.fixNumber(o.obj.value, true)} | ${o.obj.tier.charAt(0).toUpperCase() + o.obj.tier.slice(1)}\n`;
	}

	const embed = new discord.MessageEmbed()
	    .setTitle(`${msg.author.username}'s x${client.utils.fixNumber(Number(amount), true)} ${tier.charAt(0).toUpperCase() + tier.slice(1)} lootbox:`)
	    .setDescription(`${text}\n\nProfit: ${client.utils.fixNumber(value_of_box-cost, true)}`)
	    .setColor(color_table[lookup_table.indexOf(tier)])
	    .setFooter(`Price: $${client.utils.fixNumber(cost, true)} | Keep going! You'll find something awesome!`);

	msg.channel.send(embed);

}

function sendLootInfo(client, discord, msg, case_tier, cost, color){

	let text = '', inc = 0, lookup_table = require('../../info/Items.js').lookup_table;
	
	for(v of table[case_tier]){
		text += `${lookup_table[inc]}: ${v*100}%\n`;
		inc++;
	}
	
	const embed = new discord.MessageEmbed()
	    .setTitle(`${case_tier} Lootbox rewards:`)
	    .setDescription(text)
	    .setColor(color)
	    .setFooter(`Price: $${client.utils.fixNumber(cost, true)} | Try your luck and buy one or two, you'll find something awesome!`);

	msg.channel.send(embed);
	
}

const full_lookup_table = require('../../info/Items.js').lookup_table;

function totalChanceOfItemsInTier(client, tier){
	return client.items[tier].reduce((totalValue, val) => totalValue + val.rarity, 0);
}

function totalChanceOfTiersInChest(box){
	return table[box].reduce((totalValue, val) => totalValue + val);
}

// Randomly get the tier of the lootcrate
function getItemTier(case_tier){

	let random = Math.random() * totalChanceOfTiersInChest(case_tier),j = -1, i = 0;

	while(i <= random){
		j += 1;
		i += table[case_tier][j];
	}
	return j;
}

function getItem(client, case_tier, amount){
	let obj_list = [], names = [], 
	item, chance_list = {}, item_chance, 
	tier_to_roll, random;
	
	for(let count = 0; count < amount; count++){
		tier_to_roll = full_lookup_table[getItemTier(case_tier)];

		if(chance_list[tier_to_roll] != undefined){
			item_chance = chance_list[tier_to_roll];
		}
		else{
			item_chance = totalChanceOfItemsInTier(client, tier_to_roll);
			chance_list[tier_to_roll] = item_chance;
		}

		random = Math.random() * item_chance, j = -1, i = 0;

		while(i <= random){
			j += 1;
			i += client.items[tier_to_roll][j].rarity;
		}
		item = client.items[tier_to_roll][j];

		if(names.includes(item.name)){
			obj_list[names.indexOf(item.name)].count++;
		}
		else{
			obj_list.push({name: item.name, id: item.id,
				count: 1, obj: item});
			names.push(item.name);
		}
	}
	return obj_list;
}

