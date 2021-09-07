module.exports = {
    bal: require('./userMethods/bal.js'),
    gang: require('./userMethods/gang.js'),
    items: require('./userMethods/items.js'),
    xp: require('./userMethods/xp.js'),

    resetUser: async (client, user_id, rebirth=false) => {
        try{
            if(rebirth){
                client.con.query(`UPDATE user SET rebirths = rebirths+1 WHERE id = '${user_id}'`)
                client.con.query(`UPDATE user SET bal = 0 WHERE id = '${user_id}'`)
                client.con.query(`UPDATE user SET job_xp = 0 WHERE id = '${user_id}'`)
                client.con.query(`UPDATE user SET last_work = 0 WHERE id = '${user_id}'`)
                client.con.query(`UPDATE user SET job_name = 'Unemployed' WHERE id = '${user_id}'`)
            }else{
                client.con.query(`DELETE FROM user WHERE id = '${user_id}'`)
                addUserToDatabase(client, user_id)
            }
            
        }catch(e){
            client.msg.log(client.guild, e)
        }
            
    },


    get: async(client, user_id, info) => {
        return new Promise(resolve => {
                client.con.query(`SELECT ${info} FROM user WHERE id = '${user_id}'`, async (e, rows) => {
                    try{
                        if((info == '*' || info == 'achivements' || info == 'inventory') && rows.length==0) {
                            await addUserToDatabase(client, user_id)
                            return resolve(await client._user.get(client, user_id, info));
                        }
                        if(e){
                            client.msg.log(client.guild, e)
                            return resolve(null);
                        }
                        if(info === "*") resolve(rows[0]);
                        else{
                            if(rows[0] == undefined){
                                return resolve(null)
                            }
                            return resolve(rows[0][info]);
                        } 
                    }catch(e){
                        client.msg.log(client.guild, e)
                    }
                        
                })
        }).catch(e => {
            client.msg.log(client.guild, e)
        })
    },

    addUserToDatabase: (client, user_id) => {
        addUserToDatabase(client, user_id)
    }
}

function addUserToDatabase(client, user_id){
    client.con.query(`SELECT * FROM user WHERE id = '${user_id}'`, async (e, rows) => {
        if(!rows.length) client.con.query(`INSERT INTO user (id) VALUES ('${user_id}')`);
    })
}