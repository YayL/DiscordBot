function addUserToDatabase(client, plr){
    client.con.query(`INSERT INTO user (id) VALUES ('${plr.id}')`);
}

module.exports = {
    addXP(client, plr, xp, is_work_command) {
        client.con.query(`SELECT * FROM user WHERE id = '${plr.id}'`, (e, rows) => {
            if(e) return console.log(e);

            if(rows.length < 1) addUserToDatabase(client, plr)
            sql = `UPDATE user SET job_xp = ${xp+Number(rows[0].job_xp)} WHERE id = ${plr.id}`

            if(is_work_command) client.con.query(`UPDATE user SET last_work = '${Date.now()}' WHERE id = ${plr.id}`)

            client.con.query(sql)
        });
    },

    get(client, plr, info){
        return new Promise(resolve => {
            try{
                client.con.query(`SELECT ${info} FROM user WHERE id = ${plr.id}`, (e, rows) => {
                    if(!rows.length) {
                        addUserToDatabase(client, plr)
                        resolve("notFound")
                    }
                    if(e){
                        console.error(e);
                        resolve("notFound");
                    } 

                    if(info == "*") resolve(rows[0]);
                    resolve(rows[0][info]);
                })
            }catch(e){
                console.error(e);
            }
        })
    }
}