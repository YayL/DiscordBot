module.exports = {
    name: "reset",
    alias: [],
    use: "-reset @[user]",
    description: "Reset a users data",
    options: {ShowInHelp: false, Category: 'User'},
    run: function(client, msg, args, discord){
        try{
            if(!args[0]) return;

            if(args[0] == "me"){
                return client._user.resetUser(client, msg.author.id);
            }

            client.utils.getMember(args[0], msg)
            .then(member => {
                if(member != null) 
                    client._user.resetUser(client, member.id);
            });
            
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }
}