module.exports = {
    leaderboard: (client) => setInterval(() => {   // Update Leaderboard
        try{
            client.m.data.bal.updateLB(client)
        }catch(e){
            console.error(e);
        }
    }, client.timer.time.leaderboard)
}