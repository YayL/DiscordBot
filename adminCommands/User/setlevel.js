module.exports = {
    name: "SetLevel",
    alias: ["setlvl", "slvl"],
    use: "-SetLevel @[user] [level]",
    description: "Set a user's level",
    options: {ShowInHelp: false, Category: 'User'},
    run: function(client, msg, args, discord){
        try{
            let level = client.utils.suffixCheck(args[1], true);
            if(!level || 0 > level > 56) 
                return;
            
            const xp = client.data.jobs.totalLevelExp(level, true);

            if(args[0] == "me"){
                return client._user.xp.setExp(client, msg, msg.author.id, xp);
            }

           let user = msg.mentions.users.array()[0]
            if(user != null) 
                client._user.xp.setExp(client, msg, user.id, xp);
            
            
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
    }
}