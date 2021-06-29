module.exports = {

	// Inventory is a JSON list of ids

	getItem(client, id, check_if_an_item=false){
		for(tier in client.items){
			if(tier == 'color_table') break;
			for(item of client.items[tier]){
				if(item.id == id) return (check_if_an_item ? true : item)
			}
		}
		return 'Not Found';
	},

	sortItems(inventory, isNotFullObjects=false){
		return inventory.sort((a, b) => b.id - a.id);
	}
}