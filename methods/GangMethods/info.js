module.exports = {
    

    saveInfo(client, name, info){
        client.con.query(`UPDATE gangs SET info = '${JSON.stringify(info)}' WHERE name = '${name}'`);
    },

    upgrade(client, gang, upgrade){

        const value = gang.info.UPGRADES[upgrade] == undefined ? 0 : Number(gang.info.UPGRADES[upgrade]);

        gang.info.UPGRADES[upgrade] = 1 + (value == null ? 0 : Number(value));

        client.con.query(`UPDATE gangs SET info = '${JSON.stringify(gang.info)}' WHERE name = '${gang.name}'`);

        console.log(value);

        client.gang.tokens.addTokens(client, gang, -client.gang.tokens.calculateTokenCost(value))
    },

    getLimit(client, gang, upgrade){
        return client.s.GANG_UPGRADES[upgrade][1][gang.info.UPGRADES[upgrade] != undefined ? gang.info.UPGRADES[upgrade] : 0];
    },

    getGangUpgrade(client, gang, upgrade, addition=0){
        const index =  gang.info.UPGRADES[upgrade] == undefined ? 0 : gang.info.UPGRADES[upgrade];

        return client.s.GANG_UPGRADES[upgrade][1][index+addition];
    }
}