module.exports = {
    leaderboard: (client) => setInterval(() => {   // Update Leaderboard
        try{
            client.eventEm.emit('updateLB');
        }catch(e){
            client.msg.log(client.guild, e);
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
            client.msg.log(client.guild, e);
        }
    }, client.s.MARKET_CLEANING_TIMER)
}   