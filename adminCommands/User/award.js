module.exports = {
    name: "Award",
    alias: ["aw"],
    use: "-Award @[user] [Achivement ID]",
    description: "Award a user an achivement",
    options: {ShowInHelp: false, Category: 'User'},
    run: function(client, msg, args, discord){
        try{
            if(Number(args[1]) > client.achivementList.length-1) 
                return; //reply "does not exist"

            if(args[0] == "me"){
                return client.eventEm.emit('achivementEarned', msg.channel, msg.author, client.achivementList[Number(args[1])]);
            }
            let user = msg.mentions.users.array()[0]
            if(user != null) 
                return client.eventEm.emit('achivementEarned', msg.channel, user, client.achivementList[Number(args[1])]);            

        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }
}