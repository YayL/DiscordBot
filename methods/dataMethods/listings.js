module.exports = {

    addListing: async (client, user_id, item_id, amount, tier, deadline, price, userListingCount) => {
        client.con.query(`INSERT INTO market(userid, item_id, amount, tier, deadline, price) VALUES ('${user_id}', ${item_id}, ${amount}, '${tier}', ${deadline}, ${price})`);
    },

    async getListingCreator(client, id){
        return new Promise(resolve => {
            client.con.query(`SELECT * FROM market WHERE ID = ${id}`, (e, {rows}) => {
                if(e) 
                    resolve(client.msg.log("ERR", e));
                resolve(rows[0].userid);
            })
        })
    },

    async getListingByID(client, id){
        return new Promise(resolve => {
            client.con.query(`SELECT * FROM market WHERE id = ${id}`, (e, {rows}) => {
                if(e) 
                    resolve(client.msg.log("ERR", e));
                resolve(rows[0]);
            })
        })
    },

    async getUserListingsCount(client, user_id){
        return new Promise(resolve => {
            client.con.query(`SELECT * FROM market WHERE userid = '${user_id}'`, (e, {rows}) => {
                if(e) 
                    resolve(client.msg.log("ERR", e));
                resolve(rows.length);
            })
        })
    }

}
