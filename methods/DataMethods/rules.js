module.exports = {
    async getRule(client, ID) {
        return new Promise(resolve => {
            client.con.query(`SELECT * FROM rules WHERE id = '${ID}'`, (e, { rows }) => {
                if (e)
                    throw e;

                if (rows[0] == undefined) {
                    resolve(null);
                } else {
                    resolve(rows[0]);
                }
            });
        }).catch(e => {
            client.msg.log("ERR", e, client.guild);
        });
    },

    async getMaxRuleId(client) {
        return new Promise(resolve => {
            client.con.query(`SELECT MAX(id) AS value FROM rules`, (e, { rows }) => {
                if (e)
                    throw e;
                resolve(rows[0].value);
            });
        }).catch(e => {
            client.msg.log("ERR", e, client.guild);
        })
    },

    async getAllRules(client) {
        return new Promise(resolve => {
            client.con.query(`SELECT * FROM rules`, (e, { rows }) => {
                if (e)
                    throw e;
                resolve(rows);
            });
        }).catch(e => {
            client.msg.log("ERR", e, client.guild);
        });
    },

    async updateRules(client, name, desc, type, corelaw = false) {
        try {
            let sql;
            if (type == "add") {
                sql = `INSERT INTO rules (id, name, description, corelaw) VALUES (${await client.data.rules.getMaxRuleId(client) + 1}, '${name}', '${desc}', ${corelaw ? 1 : 0})`;
                console.log(1);
            } else if (type == "set") {
                sql = `UPDATE rules SET name = '${name}' WHERE id = ${index}`;
                client.con.query(sql);
                sql = `UPDATE rules SET description = "${desc}" WHERE id = ${index}`;
            } else if (type == "del") {
                sql = `DELETE FROM rules WHERE id=${index}`;
            }

            client.con.query(sql);
        } catch (e) {
            client.msg.log("ERR", e, client.guild);
        }

    }
}