module.exports = {
    getRule: (client, ID) => {
    try{
        return new Promise(resolve => {
            client.con.query(`SELECT * FROM rules WHERE id = '${ID}'`, (e, rows) => {
                if(e) throw e;
                if(rows[0] == undefined){
                    resolve(null);
                }else{
                    resolve(rows[0]);
                }
            });
        });
    }catch(e){
        console.log(e);
    }
    },

    getMaxRuleId: (client) => {
        try{
            return new Promise(resolve => {
                client.con.query(`SELECT MAX(id) AS value FROM rules`, (e, rows) => {
                    if(e) throw e;
                    resolve(rows[0].value);
                });
            });
        }catch(e){
            console.log(e);
        }
    },

    getAllRules: (client) => {
        try{
            return new Promise(resolve => {
                client.con.query(`SELECT * FROM rules`, (e, rows) => {
                    if(e) throw e;
                    resolve(rows)
                });
            });
        }catch(e){
            console.log(e);
        }
    },

    updateRules(client, name, desc, type, index){
        let sql;
        if(type == "add"){
            sql = `INSERT INTO rules (ID, rule_name, rule_desc) VALUES (${index}, '${name}', "${desc}")`;
        }else if(type == "set"){
            sql = `UPDATE rules SET rule_name = '${name}' WHERE ID = ${index}`;
            client.con.query(sql);
            sql = `UPDATE rules SET rule_desc = "${desc}" WHERE ID = ${index}`;
        }else if(type == "del"){
            sql = `DELETE FROM rules WHERE id=${index}`
        }

        client.con.query(sql);
    }
}