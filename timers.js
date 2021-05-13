module.exports = {
    leaderboard: (client) => setInterval(() => {   // Update Leaderboard
        try{
            client.m.data.bal.updateLB(client)
        }catch(e){
            client.m.msg.log(client.guild, e);
        }
    }, client.s.total_LB_Time),

    totalMoney: (client) => setInterval(() => {
        try{
            client.m.data.bal.updateTotalMoney(client)
        }catch(e){
            client.m.msg.log(client.guild, e)
        }

    }, client.s.total_TM_Time)
}