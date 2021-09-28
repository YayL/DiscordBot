module.exports = {
    name: "AddBalance",
    alias: ["abal", "addbal"],
    use: "-AddBalance @[user] [amount]",
    description: "Add to users bal",
    options: {ShowInHelp: false, Category: 'Economy'},
    run: function(client, msg, args, discord){
        try{
            if(!args[0]) return;
            
            if(args[0] == "me")
                return client._user.bal.addBalance(client, msg.author.id, args[1]);

            const user = msg.mentions.users.array()[0];
            if(user != undefined) 
                return client._user.bal.addBalance(client, user.id, args[1]);
            
            client.eventEm.emit('processFinished', msg);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }
}