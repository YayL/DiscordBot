module.exports = {
    name : "Give",
    alias : [],
    use: "-Give @[user] [id] [amount]",
    description : "Give an item to a user",
    options: {ShowInHelp: false, Category: 'Items'},
    run : async function(client, msg, args, discord){
        try{
            if(args.length < 1) 
                return client.eventEm.emit('InvalidArgs', msg, this.use);

            const user = args[0] == 'me' 
                ? msg.author 
                : msg.mentions.users.array()[0];

            if(user == undefined) 
                return client.eventEm.emit('InvalidArgs', msg, this.use);

            const id = Number(args[1]), amount = args.length >= 3 ? Number(args[2]) : 1;

            if(isNaN(id) || isNaN(amount)) 
                return client.eventEm.emit('InvalidArgs', msg, this.use);

            client._user.items.addItems(client, user.id, [{id: id, count: amount}]);

            client.eventEm.emit('processFinished', msg);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }

}