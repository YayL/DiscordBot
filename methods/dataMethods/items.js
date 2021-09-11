module.exports = {

	// Inventory is a JSON list of ids

	getItem(client, id){
		try{
			const tierIndex = (id < 10000)
				? ~~(id/1000)
				: client.items.lookup_table.length-1;

			if(tierIndex >= client.items.lookup_table.length) 
				return null;

			const item = id - 1000*(tierIndex == 8 ? 10 : tierIndex);
			
			if(item >= client.items[client.items.lookup_table[tierIndex]].length) 
				return null;

			return client.items[client.items.lookup_table[tierIndex]][item];
		}catch(e){
			console.log(e);
			return null;
		}
	},

	countItems(client){
		var num = 0;
		for(tier in client.items){
			if(tier == 'color_table') 
				break;
			num += client.items[tier].length;
		}
		return num;
	},

	isItem(client, id){
		return this.getItem(client, id) != null;
	},

	sortItems(inventory, isNotFullObjects=false){
		return inventory.sort((a, b) => b.id - a.id);
	},

	decLimitedCount(client, limited_id, count){
		
	}
}