module.exports = {
    hasItem(gang, item_id, amount){
        return gang.vault[item_id] == undefined ? false :  gang.vault[item_id].count >= amount;
    },

    async addItems(client, gang, items){
        // Get user inventory
        const vault = gang.vault == null ? {} : gang.vault;

        // Add items to the inventory or increase the count of that item
        let hasChanged = false, amount_to_add = 0;
        
        for(let item of items){
            amount_to_add = Number(item.count) // If statement somehow changes the value of item to actual item so must put this here
            if(Object.keys(vault).includes(`${item.id}`)){
                vault[item.id].count += amount_to_add;
                hasChanged = true;
            }
            else{
                if(client.data.items.isItem(client, item.id)){
                    vault[item.id] = {count: isNaN(amount_to_add) ? 1 : amount_to_add};
                    hasChanged = true;
                }
            }
        }

        if(hasChanged){
            client.con.query(`UPDATE gangs SET vault = '${JSON.stringify(vault)}' WHERE name = '${gang.name}'`);
        }
    },

    async delItems(client, gang, items){
        // Get user inventory
        const vault = gang.vault;

        // Add items to the inventory or increase the count of that item
        let hasChanged = false, index = 0;
        for(let item of items){
            index = items.indexOf(item);
            if(index == -1) 
                continue;

            if(item.count - vault[item.id].count == 0){
                delete vault[item.id];
                hasChanged = true;
            }else{
                vault[item.id].count -= item.count;
                hasChanged = true;
            }
        }

        if(hasChanged){
            client.con.query(`UPDATE gangs SET vault = '${JSON.stringify(vault)}' WHERE name = '${gang.name}'`);
        }
        
    },

    countVault(gang, count=0){
        if(gang.vault == null)
            return 0;
            
        Object.values(gang.vault).forEach(item => {
            count += item.count;
        });

        return count;
    },
}