module.exports = {
    name: "UpdateLB",
    alias: ["ulb"],
    use: "-UpdateLB",
    description: "Update Money Leaderboard",
    options: {ShowInHelp: false, Category: 'Economy'},
    run: function(client, msg, args, discord){
        try{
            client.eventEm.emit('updateLB');
            client.eventEm.emit('processFinished', msg);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }
}
