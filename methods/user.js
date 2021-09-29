module.exports = {
    bal: require('./UserMethods/bal.js'),
    items: require('./UserMethods/items.js'),
    xp: require('./UserMethods/xp.js'),

    async resetUser(client, user_id, rebirth = false, suicide = false) {
        try {

            let user = await client._user.get(client, user_id);

            if (rebirth || suicide) {
                client.con.query(`DELETE FROM users WHERE id = '${user_id}'`, async(e, _) => {
                    await addUserToDatabase(client, user_id, user.key);

                    if (user.gang != null){
                        this.set(client, user_id, 'gang', user.gang);
                    }

                    if (user.achivements != null){
                        this.set(client, user_id, 'achivements', user.achivements);
                    }
                        
                    this.set(client, user_id, 'rebirths', user.rebirths + Number(rebirth));
                });
                client.con.query(`DELETE FROM market WHERE user_id = '${user_id}'`);
                return;

            } else {
                if (user.gang != null)
                    client.gang.management.disbandGang(client, user.gang)

                client.con.query(`DELETE FROM users WHERE id = '${user_id}'`);
                delete client.userCache[user_id];
            }
        } catch (e) {
            client.msg.log("ERR", e, client.guild);
        }
    },


    get(client, user_id) {

        if(Number.isNaN(Number(user_id)))
            return null;

        if(Object.keys(client.userCache).includes(user_id)){
            return client.userCache[user_id]; 
        }
        
        return new Promise(resolve => {
            client.con.query(`SELECT * FROM users WHERE id = '${user_id}'`, async(e, result) => {
                try {
                    if (result.rowCount === 0) {
                        await addUserToDatabase(client, user_id);
                        return resolve(await client._user.get(client, user_id));
                    }
                    else{
                        client.userCache[user_id] = result.rows[0];
                    }

                    if (e) {
                        client.msg.log("ERR", e, client.guild);
                        return resolve(null);
                    }
                    
                    client.userCache[user_id] = result.rows[0];

                    resolve(result.rows[0]);
                } catch (e) {
                    client.msg.log("ERR", e, client.guild);
                }

            })
        }).catch(e => {
            client.msg.log("ERR", e, client.guild);
        })
    },

    async set(client, user_id, column, value){
        try{

            if(Number.isNaN(Number(user_id)))
                return null;

            if(Object.keys(client.userCache).includes(user_id)){
                await client.con.query(`UPDATE users SET ${column.toLowerCase()} = ${typeof value === 'number' ? value : `'${typeof value === 'object' ? JSON.stringify(value) : value}'`} WHERE id = '${user_id}'`);
                client.userCache[user_id][column] = value;
            }else{
                await addUserToDatabase(client, user_id);
                client._user.set(client, user_id, column, value);
            }
        }catch(e){
            client.msg.log('ERR', e);
        }
    },

    calculateMultiplier(client, user_roles, multiplier = 0) {
        Object.keys(client.roleStats).forEach(role => {
            if (user_roles.has(role)) {
                multiplier += client.roleStats[role][0];
            }
        })
        return multiplier;
    }
}

function addUserToDatabase(client, user_id, key = false) {
    return new Promise(resolve => {
        client.con.query(`INSERT INTO users (${!key ? '' : 'key,'}id) VALUES (${!key ? '' : `${Number(key)},`}'${user_id}')`, async (e, _) => {
            client.userCache[user_id] = await client._user.get(client, user_id);
            resolve();
        });
    }); 
}