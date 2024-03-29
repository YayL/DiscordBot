const name = (client, userid, msg) => client.utils.getMember(userid, msg)
    .then(member => {
        return member == null ? 'Unknown User' : member.displayName;
    });

function printLeaderboard(client, discord, msg, fields, footer){

    footer += client.utils.timeFormat(Math.ceil((client.s.TOTAL_LB_TIME - (Date.now()-client.leaderboardTimer))/1e3));

    const embed = new discord.MessageEmbed()
        .setTitle("***__LEADERBOARD:__***")
        .setColor('#9aedea')
        .setFooter(footer)
        .addFields(fields);

    msg.channel.send(embed);
}


module.exports = {
	name: "Leaderboard",
	alias: ["lb"],
	use: `-Leaderboard Money
          -Leaderboard Levels
          -Leaderboard Rebirths
          -Leaderboard Gangs`,
	description: "See the server leaderboard",
	options: {ShowInHelp: true, Category: "Economy"},
	run: async function(client, msg, args, discord){
        try{
            let fields = [], footer, index = 1;

            // ------------------------ Money Leaderboard ------------------------

            if(args.length < 1 || new RegExp(args[0].toLowerCase()).test("money")){
                
                if(client.cachedMoneyLB.length === 0)
                    return;

                for(let val of client.cachedMoneyLB){ 
                    fields.push(
                        {
                            name: `**${index}. ${await name(client, val.id, msg)}**`,
                            value: `**$${client.utils.fixNumber(val.bank, true)} (${Math.round(val.bank*1e6/client.totalMoney)/1e4}%)**`
                        });
                    index += 1;
                }
                footer = `These guys are rich! You require a minimum of $${client.utils.fixNumber(client.s.LB_MONEY_MIN)} to be on the leaderboard\n`
                    +`Total Server Money: ${client.utils.fixNumber(client.totalMoney, true)}\n\nNext update in: `;

            // ------------------------ Levels Leaderboard ------------------------

            }else if(new RegExp(args[0].toLowerCase()).test("levels")){

                if(client.cachedLevelLB.length === 0)
                    return;

                for(let val of client.cachedLevelLB){
                    fields.push(
                        {
                            name: `**${index}. ${await name(client, val.id, msg)}**`,
                            value: `**Level: ${client.data.jobs.expToLevel(val.experience)} (${client.utils.fixNumber(val.experience, true)} xp)**`
                        });
                    index += 1;
                }
                footer = `These guys have a lot of experience! You require level ${client.utils.fixNumber(client.s.LB_LEVEL_MIN)} to be on the leaderboard\n`
                    +`\nNext update in: `;
            

            // ------------------------ Rebirth Leaderboard ------------------------

            }else if(new RegExp(args[0].toLowerCase()).test("rebirths")){

                if(client.cachedRebirthLB.length === 0)
                    return;

                for(let val of client.cachedRebirthLB){
                    fields.push(
                        {
                            name: `**${index}. ${await name(client, val.id, msg)}**`,
                            value: `**Rebirth: ${client.utils.fixNumber(val.rebirths)}**`
                        });
                    index += 1;
                }
                footer = `These guys have a lot of rebirths! You require rebirth ${client.utils.fixNumber(client.s.LB_REBIRTH_MIN)} to be on the leaderboard\n`
                    +`\nNext update in: `;

            // ------------------------ Gang Leaderboard ------------------------

            }else if(new RegExp(args[0].toLowerCase()).test("gangs")){

                if(client.cachedGangLB.length === 0)
                    return;
                
                for(let val of client.cachedGangLB){
                    fields.push(
                        {
                            name: `**${index}. ${val.info.NAME}**`,
                            value: `**Level: ${client.utils.fixNumber(client.data.jobs.expToLevel(val.experience))} (${client.utils.fixNumber(val.experience, true)} xp)**
                            **Bank Balance: $${client.utils.fixNumber(val.bank, true)}**`
                        });
                    index += 1;
                }
                footer = `These gangs have a lot of experience! You need a level ${client.utils.fixNumber(client.s.LB_GANGLEVEL_MIN)} or higher gang to be on the leaderboard\n`
                    +`\nNext update in: `;
            }

            // ------------------------ Print Leaderboard ------------------------

            if(fields.length > 0){
                printLeaderboard(client, discord, msg, fields, footer);
            }
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }
}

