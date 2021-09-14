const table = require('../../info/Items.js').lootbox_rates;
const lookup_table = require('../../info/Items.js').lookup_table;

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
        i += table[case_tier][j];
    }
    return j;
}

function addToObjList(obj_list, item){
    var names = obj_list.map(obj => obj.name);

    if(names.includes(item.name)){
        obj_list[names.indexOf(item.name)].count++;
    }
    else{
        obj_list.push({name: item.name, id: item.id,
            count: 1, obj: item});
    }
}

module.exports = async (client, disc, msg, case_tier, obj_list) => {

    const tier_to_roll = lookup_table[getItemTier(case_tier)],
        item_chance = totalChanceOfItemsInTier(client,tier_to_roll);

    var random = Math.random() * item_chance, j = -1, i = 0;

    while(i <= random){
        j += 1;
        i += client.items[tier_to_roll][j].rarity;
    }

    addToObjList(obj_list, client.items[tier_to_roll][j]);

}

// Calculate rarity: (item_rarity/items_total_rarity)*(tier_rarity/box_total_tier_rarity)


