module.exports = {
	name : "Give",
	alias : [""],
	use: "-Give @[user] [id] [amount]",
	description : "Give an item to a user",
	options: {ShowInHelp: false, Category: 'Items'},
	run : async function(msg, client, disc, args){
		try{
			if(args.length < 1) return client.eventEm.emit('InvalidArgs', msg, this.use) 

			const user = args[0] == 'me' ? msg.author : await client.utils.getMember(args[0], msg);
			if(user == undefined) return client.eventEm.emit('InvalidArgs', msg, this.use)

			const id = Number(args[1]), amount = args.length >= 3 ? Number(args[2]) : 1
			if(isNaN(id) || isNaN(amount)) return client.eventEm.emit('InvalidArgs', msg, this.use)

			client.data.user.addItems(client, user, [{id: id, count: amount}])
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
		
	}

}