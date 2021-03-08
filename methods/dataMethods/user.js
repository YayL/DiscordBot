function addUserToDatabase(client, plr){
    client.con.query(`INSERT INTO user (id) VALUES ('${plr.id}')`);
}

function checkLevelUP(client, msg, plr, xp, info){
    if(xp >= client.m.data.jobs.levelToXP(client.m.data.jobs.xpToLevel(info.job_xp)+1)){
        client.eventEm.emit('userLevelUP', msg, plr, xp);
    }
}

module.exports = {
    addXP(client, msg, plr, xp, set_work_timer) {
        client.con.query(`SELECT * FROM user WHERE id = '${plr.id}'`, (e, rows) => {
            if(e) return console.log(e);
            if(rows.length < 1) addUserToDatabase(client, plr)
            xp += Number(rows[0].job_xp)
            sql = `UPDATE user SET job_xp = ${xp} WHERE id = '${plr.id}'`

            if(set_work_timer) client.con.query(`UPDATE user SET last_work = '${Date.now()}' WHERE id = '${plr.id}'`)

            client.con.query(sql)

            checkLevelUP(client, msg, plr, xp, rows[0])
        });
    },

    get(client, plr, info){
        return new Promise(resolve => {
            try{
                client.con.query(`SELECT ${info} FROM user WHERE id = '${plr.id}'`, (e, rows) => {
                    if(!rows.length) {
                        console.log("Nope")
                        addUserToDatabase(client, plr)
                        resolve("notFound")
                    }
                    if(e){
                        console.log(e);
                        resolve("notFound");
                    }
                    if(info == "*") resolve(rows[0]);
                    resolve(rows[0][info]);
                })
            }catch(e){
                console.log(e);
            }
        })
    }
}