function addUserToDatabase(client, user){
    client.con.query(`SELECT * FROM user WHERE id = '${user.id}'`, async (e, rows) => {
        if(!rows.length) client.con.query(`INSERT INTO user (id, achivements) VALUES ('${user.id}', '')`);
    })
}

function checkLevelUP(client, msg, user, xp, previous_xp){
    try{
        if(xp > client.data.jobs.totalLvlXp(client.data.jobs.xpToLevel(previous_xp))){
            
        }
    }catch(e){
        client.msg.log(client.guild, e)
    } 
}

function setBalance(user, amount, client){
    client.con.query(`SELECT * FROM user WHERE id = '${user.id}'`, (e, rows) => {
        try{
            if(e) throw e;
            if(amount>client.maxMoney) amount = client.maxMoney
            if(amount<0) amount=0

            let sql;

            if(rows.length < 1){
                sql = `INSERT INTO user (id, bal) VALUES ('${user.id}', ${amount})`
            }else{
                sql = `UPDATE user SET bal = ${amount} WHERE id = '${user.id}'`
            }

            client.con.query(sql);
        }catch(e){
            client.msg.log(client.guild, e)
        }

    });
}

module.exports = {

    addBalance(client, user, amount, type) {
        try{
            if(user == undefined) return
            amount = client.utils.suffixCheck(amount.toString(), true)
            if(!amount && amount != 0) return;
            if(type == "add"){
                if(amount == 0) return;
                this.getBalance(client, user)
                .then(a => {
                    setBalance(user, a+amount, client);
                });
            }else{
                setBalance(user, amount, client);
            }
        }catch(e){
            client.msg.log(client.guild, e)
        }
    },

    getBalance: async (client, user) => {
        return new Promise(async (resolve) => {
            resolve(await client.data.user.get(client, user, 'bal'));
        }).catch(e => {
            client.msg.log(client.guild, e)
        })
    },

    addItems: async (client, user, items) => {
        // Get user inventory
        var inventory = await client.data.user.get(client, user, 'inventory')

        // Check if inventory is able to be parsed
        if(`${inventory}`.toLowerCase() == 'null') inventory = {};
        else inventory = JSON.parse(inventory);

        // Add items to the inventory or increase the count of that item
        var hasChanged = false
        for(item of items){
            const amount_to_add = Number(item.count) // If statement somehow changes the value of item to actual item so must put this here
            if(inventory.hasOwnProperty(item.id)){
                inventory[item.id].count += amount_to_add;
                hasChanged = true;
            }else{
                if(client.data.items.getItem(client, item.id) != 'Not Found'){
                    inventory[item.id] = {count: isNaN(amount_to_add) ? 1 : amount_to_add}
                    hasChanged = true;
                }
            }
        }

        if(hasChanged){
            client.con.query(`UPDATE user SET inventory = '${JSON.stringify(inventory)}' WHERE id ='${user.id}' `)
        }
        
    },

    resetUser: async (client, user, rebirth=false) => {
        try{
            if(rebirth){
                client.con.query(`UPDATE user SET rebirths = rebirths+1 WHERE id = '${user.id}'`)
                client.con.query(`UPDATE user SET bal = 0 WHERE id = '${user.id}'`)
                client.con.query(`UPDATE user SET job_xp = 0 WHERE id = '${user.id}'`)
                client.con.query(`UPDATE user SET last_work = 0 WHERE id = '${user.id}'`)
                client.con.query(`UPDATE user SET job_name = 'Unemployed' WHERE id = '${user.id}'`)
            }else{
                client.con.query(`DELETE FROM user WHERE id = '${user.id}'`)
                addUserToDatabase(client, user)
            }
            
        }catch(e){
            client.msg.log(client.guild, e)
        }
            
    },

    addXP: async (client, msg, user, xp, set_work_timer) => {
        try{
            client.con.query(`SELECT * FROM user WHERE id = '${user.id}'`, async (e, rows) => {
                if(e) return console.log(e);
                if(rows.length < 1) addUserToDatabase(client, user)
                xp += Number(rows[0].job_xp)

                if(xp>client.maxXP) xp = client.maxXP
                if(xp<0) xp=0

                const previous_xp = await client.data.user.get(client, user, 'job_xp')

                sql = `UPDATE user SET job_xp = ${xp} WHERE id = '${user.id}'`

                if(set_work_timer) client.con.query(`UPDATE user SET last_work = '${Date.now()}' WHERE id = '${user.id}'`)

                client.con.query(sql)

                client.eventEm.emit('userLevelUP', msg.channel, user, xp, previous_xp);
            });
        }catch(e){
            client.msg.log(client.guild, e)
        }
        
    },



    get: async(client, user, info) => {
        return new Promise(resolve => {
                client.con.query(`SELECT ${info} FROM user WHERE id = '${user.id}'`, async (e, rows) => {
                    try{
                        if((info == '*' || info == 'achivements' || info == 'inventory') && rows.length==0) {
                            await addUserToDatabase(client, user)
                            return resolve(await client.data.user.get(client, user, info));
                        }
                        if(e){
                            client.msg.log(client.guild, e)
                            return resolve(null);
                        }
                        if(info === "*") resolve(rows[0]);
                        else{
                            if(rows[0] == undefined){
                                return resolve("")
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
    }
}