module.exports = {
    leaderboard: (client) => setInterval(() => {   // Update Leaderboard
        try{
            client.eventEm.emit('updateLB');
        }catch(e){
            client.msg.log('ERR', e);
        }
    }, client.s.TOTAL_LB_TIME),

    market: (client) => setInterval(() => {
        try{
            client.con.query(`SELECT * FROM market WHERE deadline < ${Math.floor(Date.now()/1000)}`, (e, {rows}) => {
                for(let row in rows){
                    client.data.market.remove(client, row);
                }
            });
        }catch(e){
            client.msg.log('ERR', e);
        }
    }, client.s.MARKET_CLEANING_TIMER),

    database: (client) => setInterval(() => {
        try{
            client.data.cleanDatabase(client);
        }catch(e){
            client.msg.log('ERR', e);
        }
    }, client.s.DATABASE_CLEANING_TIMER)
}   