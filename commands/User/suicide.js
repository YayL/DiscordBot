module.exports = {
    name : "Suicide",
    alias : [],
    use: "-Suicide",
    description : "Start a new life",
    options: {ShowInHelp: true, Category: "User"},
    run : function(client, msg, args, discord){
        try{
            client._user.resetUser(client, msg.author.id);
            client.eventEm.emit('suicide', msg);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }
}

