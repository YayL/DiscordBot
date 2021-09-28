module.exports = {
    name: "SetPercentage",
    alias: ["sper", "setper"],
    use: "-SetPercentage @[user] [percentage]",
    description: "Set users percentage of total server balance",
    options: {ShowInHelp: false, Category: 'Economy'},
    run: async function(client, msg, args, discord){
        try{
            if(!args[0] || !args[1]) return;

            Percentage = Number(args[1])/100;
            Percentage = (Percentage < 0 ? 0 : (Percentage >= 1 ? 1 : Percentage));

            if(args[0] == "me"){
                moneyRequired = ((client.totalMoney - await client._user.bal.getBalance(client, msg.member.id))*Percentage)/(1-Percentage);
                return client._user.bal.addBalance(client, msg.author.id, moneyRequired, true);
            }

            const user = msg.mentions.users.array()[0]
            
            if(user == undefined)
                return;

            moneyRequired = ((client.totalMoney - await client._user.bal.getBalance(client, user.id))*Percentage)/(1-Percentage);
            client._user.bal.addBalance(client, user.id, moneyRequired, true);

            client.eventEm.emit('processFinished', msg);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
        
    }
}