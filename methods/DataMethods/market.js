module.exports = {

    add: async (client, user_id, item_id, amount, tier, deadline, price, userListingCount) => {
        client.con.query(`INSERT INTO market(user_id, item_id, amount, tier, deadline, price) VALUES ('${user_id}', ${item_id}, ${amount}, '${tier}', ${deadline}, ${price})`);
    },

    getListingCreator: async (client, id) =>{
        return new Promise(resolve => {
            client.con.query(`SELECT * FROM market WHERE ID = ${id}`, (e, {rows}) => {
                if(e) 
                    resolve(command.log(e));
                resolve(rows[0].user_id);
            })
        })
    },

    remove: (client, listing) => {
        client._user.items.addItems(client, listing.user_id, [{count: listing.amount, id:listing.item_id}]);
        client.con.query(`DELETE FROM market WHERE id = ${listing.id}`);
    },

    getListingByID: async (client, id) => {
        return new Promise(resolve => {
            client.con.query(`SELECT * FROM market WHERE id = ${id}`, (e, {rows}) => {
                if(e) 
                    resolve(command.log(e));
                resolve(rows[0]);
            })
        })
    },

    getUserCount: async (client, user_id) => {
        return new Promise(resolve => {
            client.con.query(`SELECT * FROM market WHERE user_id = '${user_id}'`, (e, {rows}) => {
                if(e) 
                    resolve();
                resolve(rows.length);
            })
        })
    }

}