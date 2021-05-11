function addUserToDatabase(client, plr){
    client.con.query(`SELECT * FROM user WHERE id = '${plr.id}'`, async (e, rows) => {
        if(!rows.length) client.con.query(`INSERT INTO user (id, achivements) VALUES ('${plr.id}', '')`);
    })
}

function checkLevelUP(client, msg, plr, xp, info){
    if(xp >= client.m.data.jobs.totalLvlXp(client.m.data.jobs.xpToLevel(info.job_xp))){
        client.eventEm.emit('userLevelUP', msg, plr, xp);
    }
}

module.exports = {
    resetUser: async (client, plr, isRebirth=false) => {
        let rebirth = null;
        if(isRebirth){
            rebirth = await client.m.data.user.get(client, user, 'rebirths')+1;
            const achivements = await client.m.data.user.get(client, user, 'achivements');
        }
        
        client.con.query(`DELETE FROM user WHERE id = '${plr.id}'`)
        await addUserToDatabase(client, plr)

        if(isRebirth){
            client.con.query(`UPDATE user SET rebirths = ${rebirth} WHERE id = '${user.id}'`)
            client.con.query(`UPDATE user SET achivements = '${achivements}' WHERE id = '${user.id}'`)
        }

        return new Promise(resolve => {resolve(rebirth)})
    },

    addXP(client, msg, plr, xp, set_work_timer) {
        client.con.query(`SELECT * FROM user WHERE id = '${plr.id}'`, (e, rows) => {
            if(e) return console.log(e);
            if(rows.length < 1) addUserToDatabase(client, plr)
            xp += Number(rows[0].job_xp)
            sql = `UPDATE user SET job_xp = ${xp} WHERE id = '${plr.id}'`

            if(set_work_timer) client.con.query(`UPDATE user SET last_work = '${Date.now()}' WHERE id = '${plr.id}'`)

            client.con.query(sql)

            checkLevelUP(client, msg.channel, plr, xp, rows[0])
        });
    },

    get: async(client, plr, info) => {
        return new Promise(resolve => {
            try{
                client.con.query(`SELECT ${info} FROM user WHERE id = '${plr.id}'`, async (e, rows) => {
                    if(!rows.length) {
                        await addUserToDatabase(client, plr)
                        resolve("notFound");
                    }
                    if(e){
                        console.log(e);
                        resolve(null);
                    }
                    if(info === "*") resolve(rows[0]);
                    else resolve(rows[0][info]);
                })
            }catch(e){
                console.log(e);
                resolve(null);
            }
        }).catch(e => {
            console.log(e)
        })
    }
}