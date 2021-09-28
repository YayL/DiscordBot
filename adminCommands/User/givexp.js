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
                return client._user.xp.addExp(client, msg, msg.member.id, amount, false);
            }
            client.utils.getMember(args[0], msg)
                .then(member => {
                    if(member != null) 
                        return client._user.xp.addExp(client, msg, member.id, amount, false);
                })
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }
}