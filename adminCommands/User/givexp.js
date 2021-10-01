module.exports = {
    name: "GiveXP",
    alias: ["xp"],
    use: "-GiveXP @[user] [amount]",
    description: "Give a user some amount of xp",
    options: {ShowInHelp: false, Category: 'User'},
    run: function(client, msg, args, discord){
        try{
            let amount = client.utils.suffixCheck(args[1], true);
            if(!amount) return;
            
            if(args[0] == "me"){
                return client._user.xp.addExp(client, msg, msg.author.id, amount, false);
            }
            const user = msg.mentions.users.array()[0]
            if(member != null) 
                return client._user.xp.addExp(client, msg, user.id, amount, false);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }
}