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
        client.con.query(`SELECT * FROM gangs WHERE name = '${name}'`, (e, { rows }) => {
            try {
                if (rows.length == 0) {
                    return resolve(null);
                }

                if (e) {
                    client.msg.log("ERR", e, client.guild);
                    resolve(null);
                }
                resolve(rows[0]);

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
        client.con.query(`SELECT * FROM gangs`, (e, { rows }) => {
            try {
                if (rows.length == 0) {
                    return resolve(null);
                }

                if (e) {
                    client.msg.log("ERR", e, client.guild);
                    return resolve(null);
                }

                return resolve(rows);
            } catch (e) {
                client.msg.log("ERR", e, client.guild);
                resolve(null);
            }
        })
    }).catch(e => {
        client.msg.log("ERR", e, client.guild);
    })
}