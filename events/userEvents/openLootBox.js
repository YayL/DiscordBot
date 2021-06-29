const table = {
	common: [
		0.6, //Common
		0.35, //Uncommon
		0.05, //Rare
	],
	uncommon: [
		0.3, //Common
		0.44, //Uncommon
		0.2, //Rare
		0.05, //Epic
		0.001, //Exotic
	],
	rare: [
		0.1, //Common
		0.3, //Uncommon
		0.35, //Rare
		0.15, //Epic
		0.01, //Exotic
		0.0001, //Legendary
	],
	epic: [
		0.05, //Common
		0.1, //Uncommon
		0.4, //Rare
		0.3, //Epic
		0.1, //Exotic
		0.01 //Legendary
	],
	exotic: [
		0, //Common
		0.05, //Uncommon
		0.2, //Rare
		0.4, //Epic
		0.3, //Exotic
		0.05, //Legendary
		0.00001, //Special
		0.00000001 //God
	],
	legendary: [
	    0, //Common
	    0, //Uncommon
		0.05, //Rare
		0.2, //Epic
		0.4, //Exotic
		0.3, //Legendary
		0.001, //Special
		0.00001, //God
		0.0000001 //Limited
	]

}
const lookup_table = ['Common', 'Uncommon', 'Rare', 'Epic', 'Exotic', 'Legendary', 'Special', 'God', 'Limited']

function totalChanceOfItemsInTier(client, tier){
	return client.items[tier].reduce((totalValue, val) => totalValue + val.rarity, 0);
}

function totalChanceOfTiersInChest(box){
	return table[box].reduce((totalValue, val) => totalValue + val);
}

function getItemTier(case_tier){

	var random = Math.random() * totalChanceOfTiersInChest(case_tier),j = -1, i = 0;

	while(i <= random){
		j += 1;
		i += table[case_tier][j]
	}
	return j
}

function addToObjList(client, obj_list, item, chest_rarity, item_rarity){
	var names = obj_list.map(obj => obj.name);

	if(names.includes(item.name)){
		obj_list[names.indexOf(item.name)].count++;
	}else{
		obj_list.push({name: item.name, id: item.id,
			rarity: Math.floor(0.5 + 100000*(item_rarity*chest_rarity))/1000,
			count: 1, obj: item})
	}
}

module.exports = async (client, disc, msg, case_tier, obj_list, sendInfo=false, color=false, cost=false) => {
	
	var low_lookup_table = lookup_table.map(val => val.toLowerCase()) // Lower cased version

	if(sendInfo) return sendLootInfo(client, msg, color, cost, low_lookup_table.indexOf(case_tier), disc)

	

	const tier_to_roll = low_lookup_table[getItemTier(case_tier)]
	const chest_chance = totalChanceOfTiersInChest(case_tier), item_chance = totalChanceOfItemsInTier(client,tier_to_roll)

	var random = Math.random() * item_chance, j = -1, i = 0;

	while(i <= random){
		j += 1;
		i += client.items[tier_to_roll][j].rarity
	}

	addToObjList(client, obj_list, client.items[tier_to_roll][j], client.items[tier_to_roll][j].rarity/item_chance, table[case_tier][low_lookup_table.indexOf(tier_to_roll)]/chest_chance)

}

function sendLootInfo(client, msg, color, cost, case_tier, disc){
	case_tier = lookup_table[case_tier]

	var text = '', inc = 0;
	for(val of table[case_tier.toLowerCase()]){
		text += `${lookup_table[inc]}: ${val*100}%\n`
		inc++;
	}
	
	const embed = new disc.MessageEmbed()
	    .setTitle(`${case_tier} Lootbox rewards:`)
	    .setDescription(text)
	    .setColor(color)
	    .setFooter(`Price: $${client.utils.numberWithCommas(cost, true)} | Try your luck and buy one or two, you'll find something awesome!`);

	msg.channel.send(embed);
	
}
