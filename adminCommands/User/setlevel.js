module.exports = {
	name: "SetLevel",
	alias: ["setlvl", "slvl"],
	use: "-SetLevel @[user] [level]",
	description: "Set a user's level",
	options: {ShowInHelp: false},
	run: function(msg, client, disc, args){
		try{
			let level = client.utils.suffixCheck(args[1], true)
			if(!level || 0 > level > 200) return;
			
			const xp = client.data.jobs.totalLvlXp(level, true), previous_xp = client.data.user.get(client, msg.author, 'job_xp')

			if(args[0] == "me"){
				return client.data.user.addXP(client, msg, member, amount, false);
			}

			client.utils.getMember(args[0], msg)
			.then(member => {
				client.data.user.addXP(client, msg, member, amount, false);
			}).catch(e => {
				client.eventEm.emit('CommandError', msg, this.name, args, e)
			});
			
			
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
		
	}
}