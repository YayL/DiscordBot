exports.user = require('./GangMethods/user.js');
exports.invite = require('./GangMethods/invite.js');
exports.management = require('./GangMethods/management');
exports.permissions = require('./GangMethods/permissions.js');
exports.info = require('./GangMethods/info.js');
exports.vault = require('./GangMethods/vault.js');
exports.xp = require('./GangMethods/xp.js');
exports.tokens = require('./GangMethods/tokens.js');
exports.bank = require('./GangMethods/bank.js');


exports.getGang = function(client, name) {
    return new Promise(resolve => {
        client.con.query(`SELECT * FROM gangs WHERE name = '${name}'`, (e, result) => {
            try {
                if (result.rowCount == 0) {
                    return resolve(null);
                }

                if (e) {
                    client.msg.log("ERR", e, client.guild);
                    resolve(null);
                }

                resolve(result.rows[0]);

            } catch (e) {
                client.msg.log("ERR", e, client.guild);
                resolve(null);
            }

        })
    }).catch(e => {
        client.msg.log("ERR", e, client.guild);
    })
}

exports.getAllGangs = function(client) {
    return new Promise(resolve => {
        client.con.query(`SELECT * FROM gangs`, (e, result) => {
            try {
                if (result.rowCount == 0) {
                    return resolve(null);
                }

                if (e) {
                    client.msg.log("ERR", e, client.guild);
                    return resolve(null);
                }

                return resolve(result.rows);
            } catch (e) {
                client.msg.log("ERR", e, client.guild);
                resolve(null);
            }
        })
    }).catch(e => {
        client.msg.log("ERR", e, client.guild);
    })
}

exports.set = async function(client, gang, column, value){
    try{   
        await client.con.query(`UPDATE gangs SET ${column} = ${typeof value === 'number' ? value : `'${typeof value === 'object' ? JSON.stringify(value) : value}'`} WHERE name = ${gang.name}`)
    }catch(e){
        client.msg.log('ERR', e)
    }
}