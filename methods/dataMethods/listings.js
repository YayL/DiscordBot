module.exports = {

    addListing: async (client, user_id, item_id, amount, tier, deadline, price, userListingCount) => {
        client.con.query(`INSERT INTO market(userid, item_id, amount, tier, deadline, price) VALUES ('${user_id}', ${item_id}, ${amount}, '${tier}', ${deadline}, ${price})`);
    },

    getListingCreator: async (client, id) =>{
        return new Promise(resolve => {
            client.con.query(`SELECT * FROM market WHERE ID = ${id}`, (e, {rows}) => {
                if(e) 
                    resolve(command.log(e));
                resolve(rows[0].userid);
            })
        })
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

    getUserListingsCount: async (client, user_id) => {
        return new Promise(resolve => {
            client.con.query(`SELECT * FROM market WHERE userid = '${user_id}'`, (e, {rows}) => {
                if(e) 
                    resolve(console.log(e));
                resolve(rows.length);
            })
        })
    }

}