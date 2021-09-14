module.exports = {
    bal: require('./userMethods/bal.js'),
    gang: require('./userMethods/gang.js'),
    items: require('./userMethods/items.js'),
    xp: require('./userMethods/xp.js'),

    async resetUser(client, user_id, rebirth=false){
        try{
            if(rebirth){
                client.con.query(`UPDATE users SET rebirths = rebirths+1 WHERE id = '${user_id}'`);
                client.con.query(`UPDATE users SET bal = 0 WHERE id = '${user_id}'`);
                client.con.query(`UPDATE users SET job_xp = 0 WHERE id = '${user_id}'`);
                client.con.query(`UPDATE users SET last_work = 0 WHERE id = '${user_id}'`);
                client.con.query(`UPDATE users SET job_name = 'Unemployed' WHERE id = '${user_id}'`);
            }else{
                client.con.query(`DELETE FROM market WHERE userid = '${user_id}'`);
                client.con.query(`DELETE FROM users WHERE id = '${user_id}'`)
                    .then(_ => {
                        addUserToDatabase(client, user_id);
                    });
                
            }
        }catch(e){
            client.msg.log("ERR", e, client.guild);
        }
            
    },


    async get(client, user_id, info='*'){
        return new Promise(resolve => {
                client.con.query(`SELECT ${info} FROM users WHERE id = '${user_id}'`, async (e, {rows}) => {
                    try{
                        if((info == '*' || info == 'achivements' || info == 'inventory') && rows.length == 0) {
                            await addUserToDatabase(client, user_id);
                            return resolve(await client._user.get(client, user_id, info));
                        }
                        if(e){
                            client.msg.log("ERR", e, client.guild);
                            return resolve(null);
                        }

                        if(info === "*") 
                            resolve(rows[0]);
                        else{
                            if(rows[0] == undefined){
                                return resolve(null);
                            }
                            return resolve(rows[0][info]);
                        } 
                    }catch(e){
                        client.msg.log("ERR", e, client.guild);
                    }
                        
                })
        }).catch(e => {
            client.msg.log("ERR", e, client.guild);
        })
    },
}

function addUserToDatabase(client, user_id){
    client.con.query(`SELECT * FROM users WHERE id = '${user_id}'`, (e, {rows}) => {
        if(rows.length == 0) 
            client.msg.log("DEBUG", `${rows.length}: ${rows}`);
            client.con.query(`INSERT INTO users (id) VALUES ('${user_id}')`);
    })
}
