module.exports = {
    bal: require('./UserMethods/bal.js'),
    items: require('./UserMethods/items.js'),
    xp: require('./UserMethods/xp.js'),

    async resetUser(client, user_id, rebirth = false, suicide = false) {
        try {
            if (rebirth || suicide) {
                client.con.query(`SELECT * FROM users WHERE id = '${user_id}'`, (e, { rows }) => {
                    client.con.query(`DELETE FROM users WHERE id = '${user_id}'`, async(e, _) => {
                        await addUserToDatabase(client, user_id, rows[0].key);

                        if (rows[0].gang != null)
                            client.con.query(`UPDATE users SET gang = '${rows[0].gang}' WHERE id = '${user_id}'`);

                        if (rows[0].achivements != null)
                            client.con.query(`UPDATE users SET achivements = '${JSON.stringify(rows[0].achivements)}' WHERE id = '${user_id}'`);

                        client.con.query(`UPDATE users SET rebirths = '${rows[0].rebirths + Number(!suicide)}' WHERE id = '${user_id}'`);
                    });
                    client.con.query(`DELETE FROM market WHERE userid = '${user_id}'`);
                    return;
                })
            } else {
                client.con.query(`SELECT * FROM users WHERE id = '${user_id}'`, (e, { rows }) => {
                    if (rows[0].gang != null)
                        client.data.gang.disbandGang(client, rows[0].gang)
                    client.con.query(`DELETE FROM users WHERE id = '${user_id}'`);
                })

            }
        } catch (e) {
            client.msg.log("ERR", e, client.guild);
        }

    },


    get(client, user_id, info = '*') {
        return new Promise(resolve => {
            client.con.query(`SELECT ${info} FROM users WHERE id = '${user_id}'`, async(e, { rows }) => {
                try {
                    if ((info == '*' || info == 'achivements' || info == 'inventory') && rows.length == 0) {
                        await addUserToDatabase(client, user_id);
                        return resolve(await client._user.get(client, user_id, info));
                    }
                    if (e) {
                        client.msg.log("ERR", e, client.guild);
                        return resolve(null);
                    }

                    if (info === "*")
                        resolve(rows[0]);
                    else {
                        if (rows[0] == undefined) {
                            return resolve(null);
                        }
                        return resolve(rows[0][info]);
                    }
                } catch (e) {
                    client.msg.log("ERR", e, client.guild);
                }

            })
        }).catch(e => {
            client.msg.log("ERR", e, client.guild);
        })
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
                client.con.query(`SELECT * FROM users WHERE id = '${user_id}'`, (e, { rows }) => {
                            if (rows.length == 0) {
                                client.con.query(`INSERT INTO users (${!key ? '' : 'key,'}id) VALUES (${!key ? '' : `${key},`}'${user_id}')`, (e, {rows}) => {
                    resolve();
                })
            }
        });
    });
}