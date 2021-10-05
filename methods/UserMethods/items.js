module.exports = {
    async getInventory(client, user_id){

        const user = (await client._user.get(client, user_id));

        // Check if inventory is able to be parsed
        if(`${user.inventory}`.toLowerCase() == 'null')
            user.inventory = {};

        return user.inventory;
    },

    async addItems(client, user_id, items){
        // Get user inventory

        if(Number.isNaN(Number(user_id)))
            return;

        let inventory = await client._user.items.getInventory(client, user_id);

        // Add items to the inventory or increase the count of that item
        let hasChanged = false, amount_to_add = 0;
        
        for(let item of items){
            amount_to_add = Number(item.count) // If statement somehow changes the value of item to actual item so must put this here
            if(Object.keys(inventory).includes(`${item.id}`)){
                inventory[item.id].count += amount_to_add;
                hasChanged = true;
            }
            else{
                if(client.data.items.isItem(client, item.id)){
                    inventory[item.id] = {count: isNaN(amount_to_add) ? 1 : amount_to_add};
                    hasChanged = true;
                }
            }
        }

        if(hasChanged)
            client._user.set(client, user_id, 'inventory', inventory);
        
        
    },

    async delItems(client, user_id, items){

        if(Number.isNaN(Number(user_id)))
            return;

        // Get user inventory
        var inventory = await client._user.items.getInventory(client, user_id);

        // Add items to the inventory or increase the count of that item
        var hasChanged = false, index = 0;
        for(let item of items){
            index = items.indexOf(item);
            if(index == -1) 
                continue;

            if(item.count - inventory[item.id].count == 0){
                delete inventory[item.id];
                hasChanged = true;
            }else{
                inventory[item.id].count -= item.count;
                hasChanged = true;
            }
            
        }

        if(hasChanged)
            client._user.set(client, user_id, 'inventory', inventory);
        
    },

    hasItem(inventory, item_id, amount=1){
        return inventory[item_id] == undefined ? false : inventory[item_id].count >= amount;
    }
}
