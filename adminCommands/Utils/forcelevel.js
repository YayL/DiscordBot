module.exports = {
	name: "ForceLevel",
	alias: [],
	use: "-ForceLevel @[user]",
	description: "Get a users level",
	options: {ShowInHelp: false},
	run: async function(msg, client, disc, args){
		try{
			let level = 0
			if(args[0] == "me"){
				level = await client.data.jobs.xpToLevel(await client.data.user.get(client, msg.member, 'job_xp'), true);
				return client.msg.reply(msg, `${msg.member.displayName}'s Level:`, `Level: **${level}**`, disc)
			}else{
				client.utils.getMember(args[0], msg)
				.then(async (member) => {
					level = await client.data.jobs.xpToLevel(await client.data.user.get(client, member, 'job_xp'), true);
					return client.msg.reply(msg, `${member.displayName}'s Level:`, `Level: **${level}**`, disc)
				});
			}
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
	}
}