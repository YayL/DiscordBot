    module.exports = {
    name : "Profile",
    alias : ["p"],
    use: "-Profile",
    description : "Gives you some information about yourself",
    options: {ShowInHelp: true, Category: "User"},
    run: async function(client, msg, args, discord){
        try{

            const plr = args[0] == "me" || args.length == 0 ? msg.member : await client.utils.getMember(args[0], msg).then(plr => {return plr})

            if(plr == null) return client.eventEm.emit('InvalidArgs', msg, this.use)

            let user = await client._user.get(client, plr.id);

            const bank_balance = Number(user.bank),
                job = user.job,
                gang_name = user.gang != null ? user.gang.charAt(0).toUpperCase() + user.gang.slice(1) : 'Not in a gang',
                experience = Number(user.experience),
                level = client.data.jobs.expToLevel(experience, true),
                requiredXp_ToNextLvl = client.data.jobs.nextLevelExp(level);

            profileInfo = `
                **Bank Balance:**\n💵 $${client.utils.fixNumber(bank_balance, true)}\n\u200b
                 **Job Title:**\n🏢 ${job}\n\u200b
                 **Gang:**\n👪 __${gang_name}__\n\u200b
                 **Level:\n⏳ **${level >= client.s.MAX_LEVEL ? 'Max' : level}\n\u200b
                 **Experience:**\n⚙️ ${client.utils.fixNumber(experience-client.data.jobs.totalLevelExp(level))}/`
                 + `${level >= client.s.MAX_LEVEL ? "Max" : client.utils.fixNumber(requiredXp_ToNextLvl)}\n\u200b
                 **Rebirths:**\n🖤 ${user.rebirths}`;

            const embed = new discord.MessageEmbed()
                .setTitle(`${msg.member.displayName}'s Profile`)
                .setDescription(`\n\u200b${profileInfo}\n\u200b\n`)
                .setThumbnail(msg.author.avatarURL())
            
            msg.channel.send(embed);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }
}

