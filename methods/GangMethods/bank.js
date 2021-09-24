module.exports = {

    addBalance(client, gang, amount){
        if(gang.bank + amount < 0)
            amount = -gang.bank;

        client.con.query(`UPDATE gangs SET bank = bank + ${amount} WHERE name = '${gang.name}'`);
    }

}