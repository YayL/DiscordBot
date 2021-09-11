module.exports = {
    getRule: async (client, ID) => {
        return new Promise(resolve => {
            client.con.query(`SELECT * FROM rules WHERE id = '${ID}'`, (e, {rows}) => {
                if(e) 
                    throw e;

                if(rows[0] == undefined){
                    resolve(null);
                }
                else{
                    resolve(rows[0]);
                }
            });
        }).catch(e => {
            client.msg.log(client.guild, e);
        });
    },

    getMaxRuleId: async (client) => {
        return new Promise(resolve => {
            client.con.query(`SELECT MAX(id) AS value FROM rules`, (e, {rows}) => {
                if(e) 
                    throw e;
                resolve(rows[0].value);
            });
        }).catch(e => {
            client.msg.log(client.guild, e);
        })
    },

    getAllRules: async (client) => {
        return new Promise(resolve => {
            client.con.query(`SELECT * FROM rules`, (e, {rows}) => {
                if(e) 
                    throw e;
                resolve(rows);
            });
        }).catch(e => {
            client.msg.log(client.guild, e);
        });
    },

    updateRules(client, name, desc, type){
        try{
            let sql;
            if(type == "add"){
                sql = `INSERT INTO rules (id, name, description) VALUES (${client.data.rules.getMaxRuleId(client)+1},'${name}', "${desc}")`;
            }
            else if(type == "set"){
                sql = `UPDATE rules SET name = '${name}' WHERE ID = ${index}`;
                client.con.query(sql);
                sql = `UPDATE rules SET description = "${desc}" WHERE ID = ${index}`;
            }
            else if(type == "del"){
                sql = `DELETE FROM rules WHERE id=${index}`;
            }

            client.con.query(sql);
        }catch(e){
            client.msg.log(client.guild, e);
        }
        
    }
}