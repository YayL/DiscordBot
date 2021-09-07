module.exports = {
    leaderboard: (client) => setInterval(() => {   // Update Leaderboard
        try{
            client.eventEm.emit('updateLB')
            client.eventEm.emit('updateLB', 'lvl')
        }catch(e){
            client.msg.log(client.guild, e);
        }
    }, client.s.TOTAL_LB_TIME)
}   