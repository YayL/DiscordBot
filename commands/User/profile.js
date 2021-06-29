    module.exports = {
	name : "Profile",
	alias : ["p"],
	use: "-Profile",
	description : "Gives you some information about yourself",
	options: {ShowInHelp: true, Category: "User"},
	run: async function(msg, client, disc, args){
        try{
            await client.data.bal.updateTotalMoney(client);

            const plr = args[0] == "me" || args[0] == undefined ? msg.member : await client.utils.getMember(args[0], msg).then(plr => {return plr})

            let user = await client.data.user.get(client, plr, '*')
            user = user == "notFound" ? await client.data.user.get(client, msg.member, '*') : user
            const bal = user.bal;
            const job_name = user.job_name;
            const job_xp = user.job_xp;
            const job_lvl = client.data.jobs.xpToLevel(job_xp, true);
            const requiredXp_ToNextLvl = client.data.jobs.nextLvlXp(job_lvl);

            profileInfo = "----------\n"
                + `Bank Balance: **$${client.utils.numberWithCommas(bal, true)}**\n`
                + `Percentage of Market Capital: **${Math.floor((bal/client.totalMoney)*1000000)/10000}% **\n`
                + `Job Title: **${job_name}**\n`
                + `Level: **${job_lvl >= client.s.maxLevel ? 'Max' : job_lvl}**\n`
                + `Current XP: **${client.utils.numberWithCommas(job_xp-client.data.jobs.totalLvlXp(job_lvl))}`
                + `/${job_lvl >= client.s.maxLevel ? "Max" : client.utils.numberWithCommas(requiredXp_ToNextLvl)}** `
                + `--> Next Level: **${job_lvl >= client.s.maxLevel ? 'Max' : job_lvl+1}**\n`
                + `Rebirths: **${user.rebirths}**`

            client.msg.reply(msg, `${plr.displayName}'s Profile:`, profileInfo, disc)
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
	    
	}
}

