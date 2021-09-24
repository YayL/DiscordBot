module.exports = {
    name: "SetLevel",
    alias: ["setlvl", "slvl"],
    use: "-SetLevel @[user] [level]",
    description: "Set a user's level",
    options: {ShowInHelp: false, Category: 'User'},
    run: function(client, msg, args, discord){
        try{
            let level = client.utils.suffixCheck(args[1], true);
            if(!level || 0 > level > 56) return;
            
            const xp = client.data.jobs.totalLvlXp(level, true);

            if(args[0] == "me"){
                return client._user.xp.setXP(client, msg, msg.member.id, xp);
            }

            client.utils.getMember(args[0], msg)
                .then(member => {
                    if(member != null) 
                        client._user.xp.setXP(client, msg, member.id, xp);
                });
            
            
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
    }
}