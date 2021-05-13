module.exports = {
	name: "SetLevel",
	alias: ["setlvl", "slvl"],
	use: "-SetLevel @[user] [level]",
	description: "Set a user's level",
	options: {ShowInHelp: false},
	run: function(msg, client, disc, args){
		try{
			let level = client.m.utils.suffixCheck(args[1], true)
			if(!level || 0 > level > 200) return;
			
			const xp = client.m.data.jobs.totalLvlXp(level-1, true)

			if(args[0] == "me"){
				client.con.query(`UPDATE user SET job_xp = ${xp} WHERE id = ${msg.member.id}`);
				return client.eventEm.emit('userLevelUP', msg.channel, msg.member, xp);
			}

			client.m.utils.getMember(args[0], msg)
			.then(member => {
				client.con.query(`UPDATE user SET job_xp = ${xp} WHERE id = ${member.id}`);
				client.eventEm.emit('userLevelUP', msg.channel, member, xp);
			}).catch(e => {
				client.eventEm.emit('CommandError', msg, this.name, args, e)
			});
			
			
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
		
	}
}