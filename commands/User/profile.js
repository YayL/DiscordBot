    module.exports = {
	name : "Profile",
	alias : ["p"],
	use: "-Profile",
	description : "Gives you some information about yourself",
	options: {ShowInHelp: true, Category: "User"},
	run: async function(client, msg, args, discord){
        try{
            await client.data.bal.updateTotalMoney(client);

            const plr = args[0] == "me" || args.length == 0 ? msg.member : await client.utils.getMember(args[0], msg).then(plr => {return plr})

            if(plr == null) return client.eventEm.emit('InvalidArgs', msg, this.use)

            let user = await client._user.get(client, plr.id);

            const bal = Number(user.bal),
                job_name = user.job_name,
                gang_name = user.gang != null ? user.gang.charAt(0).toUpperCase() + user.gang.slice(1) : 'Not in a gang',
                job_xp = Number(user.job_xp),
                job_lvl = client.data.jobs.xpToLevel(job_xp, true),
                requiredXp_ToNextLvl = client.data.jobs.nextLvlXp(job_lvl);

            profileInfo = `----------
                 Bank Balance: **$${client.utils.fixNumber(bal, true)}**
                 Percentage of Market Capital: **${Math.floor((bal/client.totalMoney)*1000000)/10000}% **
                 Job Title: **${job_name}**
                 Gang: **__${gang_name}__**
                 Level: **${job_lvl >= client.s.MAX_LEVEL ? 'Max' : job_lvl}**
                 Current XP: **${client.utils.fixNumber(job_xp-client.data.jobs.totalLvlXp(job_lvl))}/`
                 + `${job_lvl >= client.s.MAX_LEVEL ? "Max" : client.utils.fixNumber(requiredXp_ToNextLvl)}**
                 Rebirths: **${user.rebirths}**`;

            client.msg.reply(msg, `${plr.displayName}'s Profile:`, profileInfo, discord);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
	    
	}
}

