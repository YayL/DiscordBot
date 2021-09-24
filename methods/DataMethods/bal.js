module.exports = {

    updateTotalMoney(client) {
        try {
            return new Promise(resolve => {
                client.con.query(`SELECT * FROM users`, (e, { rows }) => {
                    if (e)
                        return;

                    if (!rows.length)
                        client.totalMoney = 1;


                    var money = 0

                    for (let row of rows) {
                        if (Number(row.bal) > 0)
                            money += Number(row.bal);
                    }

                    client.totalMoney = money != 0 ? money : 1;
                    resolve();
                })
            })
        } catch (e) {
            client.msg.log("ERR", e, client.guild);
        }

    },
}