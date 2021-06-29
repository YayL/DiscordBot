function printLeaderboard(client, disc, msg, fields, footer){
    const embed = new disc.MessageEmbed() // Create embeded message
        .setTitle("***__LEADERBOARD:__***") // Set the title
        .setColor('#9aedea') // Give it a color in hexidecimal format

    embed.addFields(fields)

    let seconds = (client.s.total_LB_Time - (Date.now()-client.timer.leaderboard))/1e3
    let minutes = Math.floor(seconds/60)
    seconds = Math.floor(seconds - minutes*60)

    if(minutes > 0){footer += ""+minutes+"min "+seconds+"s"
    }else{footer += ""+seconds+"s"}

    embed.setFooter(footer);
    msg.channel.send(embed);
}


module.exports = {
	name: "Leaderboard",    
	alias: ["lb"],
	use: "-Leaderboard [type M/L]",
	description: "See the server leaderboard",
	options: {ShowInHelp: true, Category: "Economy"},
	run: async function(msg, client, disc, args){
        try{
            if(!args[0]) return

            const fields = []
            var name, footer;
            var index = 1;   

            // ------------------------ Money Leaderboard ------------------------

            if(new RegExp(args[0].toLowerCase()).test("money")){
                if(client.cachedMoneyLB.length == undefined) await client.eventEm.emit('updateLB');

                for(val of client.cachedMoneyLB){
                    name = await client.utils.getMember(val.id, msg).then(plr => {return plr.displayName})
                    fields.push({
                        name: `**${index}. ${name}**`,
                        value: `**$${client.utils.numberWithCommas(val.bal, true)} (${Math.round(val.bal*1e6/client.totalMoney)/1e4}%)**`
                    });
                    index += 1;
                }

                footer = `These guys are rich! You require a minimum of $${client.utils.numberWithCommas(client.s.lbMoneyMin)} to be on the leaderboard\n`
                    +`Total Server Money: ${client.utils.numberWithCommas(client.totalMoney, true)}\n\nNext update in: `;

            // ------------------------ Levels Leaderboard ------------------------

            }else if(new RegExp(args[0].toLowerCase()).test("levels")){
                if(client.cachedLevelLB.length == undefined) await client.eventEm.emit('updateLB', 'lvl');

                for(val of client.cachedLevelLB){
                    name = await client.utils.getMember(val.id, msg).then(plr => {return plr.displayName})
                    fields.push({
                        name: `**${index}. ${name}**`,
                        value: `**Level: ${client.data.jobs.xpToLevel(val.job_xp)} (${client.utils.numberWithCommas(val.job_xp)}xp)**`
                    });
                    index += 1;
                }

                footer = `These guys have a lot of experience! You require level ${client.utils.numberWithCommas(client.s.lbLevelMin)} to be on the leaderboard\n`
                    +`\nNext update in: `;
            }

            // ------------------------ Print Leaderboard ------------------------

            if(fields.length > 0){
                printLeaderboard(client, disc, msg, fields, footer)
            }
            
            
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
                
	}
}

