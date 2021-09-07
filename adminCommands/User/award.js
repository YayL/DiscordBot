module.exports = {
	name: "Award",
	alias: ["aw"],
	use: "-Award @[user] [Achivement ID]",
	description: "Award a user an achivement",
	options: {ShowInHelp: false, Category: 'User'},
	run: function(msg, client, disc, args){
		try{
			if(Number(args[1]) > client.achivementList.length-1) return //reply "does not exist"

			if(args[0] == "me"){
				return client.eventEm.emit('achivementEarned', msg.channel, msg.member, client.achivementList[Number(args[1])]);
			}
			client.utils.getMember(args[0], msg)
			.then(member => {
				if(member == null) return
				return client.eventEm.emit('achivementEarned', msg.channel, member, client.achivementList[Number(args[1])]);
			}).catch(e => {
				client.eventEm.emit('CommandError', msg, this.name, args, e)
			})

        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
		
	}
}