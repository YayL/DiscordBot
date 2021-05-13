function addUserToDatabase(client, plr){
    client.con.query(`SELECT * FROM user WHERE id = '${plr.id}'`, async (e, rows) => {
        if(!rows.length) client.con.query(`INSERT INTO user (id, achivements) VALUES ('${plr.id}', '')`);
    })
}

function checkLevelUP(client, msg, plr, xp, info){
    try{
        if(xp >= client.m.data.jobs.totalLvlXp(client.m.data.jobs.xpToLevel(info.job_xp))){
            client.eventEm.emit('userLevelUP', msg, plr, xp);
        }
    }catch(e){
        client.m.msg.log(client.guild, e)
    } 
}

module.exports = {
    resetUser: async (client, user) => {
        try{
            client.con.query(`DELETE FROM user WHERE id = '${user.id}'`)
            return new Promise((resolve) => {resolve(addUserToDatabase(client, user))})
        }catch(e){
            client.m.msg.log(client.guild, e)
        }
            
    },

    addXP(client, msg, plr, xp, set_work_timer) {
        try{
            client.con.query(`SELECT * FROM user WHERE id = '${plr.id}'`, (e, rows) => {
                if(e) return console.log(e);
                if(rows.length < 1) addUserToDatabase(client, plr)
                xp += Number(rows[0].job_xp)

                if(xp>client.maxXP) xp = client.maxXP
                if(xp<0) xp=0

                sql = `UPDATE user SET job_xp = ${xp} WHERE id = '${plr.id}'`

                if(set_work_timer) client.con.query(`UPDATE user SET last_work = '${Date.now()}' WHERE id = '${plr.id}'`)

                client.con.query(sql)

                checkLevelUP(client, msg.channel, plr, xp, rows[0])
            });
        }catch(e){
            client.m.msg.log(client.guild, e)
        }
        
    },



    get: async(client, plr, info) => {
        return new Promise(resolve => {
                client.con.query(`SELECT ${info} FROM user WHERE id = '${plr.id}'`, async (e, rows) => {
                    try{
                        if(info==="*" && rows.length==0) {
                            await addUserToDatabase(client, plr)
                            return resolve("notFound");
                        }
                        if(e){
                            client.m.msg.log(client.guild, e)
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
                        client.m.msg.log(client.guild, e)
                    }
                        
                })
        }).catch(e => {
            client.m.msg.log(client.guild, e)
        })
    }
}