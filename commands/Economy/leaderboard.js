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
    use: `-Leaderboard money
          -Leaderboard levels`,
    description: "See the server leaderboard",
    options: {ShowInHelp: true, Category: "Economy"},
    run: async function(client, msg, args, discord){
        try{
            client.msg.log("DEBUG", "Leaderboard");
            let fields = [], footer = "";

            // ------------------------ Money Leaderboard ------------------------

            if(args.length < 1 || new RegExp(args[0].toLowerCase()).test("money")){
                client.con.query(`SELECT * FROM money_lb(${client.s.LB_MONEY_MIN}, ${client.s.LB_SIZE})`, async (e, {rows}) => {
                    if(e) return client.msg.log("ERROR", e);

                    for(let row of rows)
                        fields.push({
                            name: `**${fields.length+1}. ${await name(client, row.id, msg)}**`,
                            value: `**$${client.utils.fixNumber(row.bal, true)} (${Math.round(row.bal*1e6/client.totalMoney)/1e4}%)**`
                        });
                    footer = `These guys are rich! You require a minimum of $${client.utils.fixNumber(client.s.LB_MONEY_MIN)} to be on the leaderboard\n`
                        +`Total Server Money: ${client.utils.fixNumber(client.totalMoney, true)}\n\nNext update in: `;

                    if(fields.length > 0)
                        printLeaderboard(client, discord, msg, fields, footer);
                });

            // ------------------------ Levels Leaderboard ------------------------
            
            }else if(new RegExp(args[0].toLowerCase()).test("levels")){
                client.con.query(`SELECT * FROM levels_lb(${client.s.LB_LEVEL_MIN}, ${client.data.jobs.totalLvlXp(client.s.LB_SIZE)})`, async (e, {rows}) => {
                    if(e) return client.msg.log("ERROR", e);

                    for(let row of rows)
                        fields.push({
                            name: `**${fields.length+1}. ${await name(client, row.id, msg)}**`,
                            value: `**Level: ${client.data.jobs.xpToLevel(row.job_xp)} (${client.utils.fixNumber(row.job_xp)}xp)**`
                        });
                    footer = `These guys have a lot of experience! You require level ${client.utils.fixNumber(client.s.LB_LEVEL_MIN)} to be on the leaderboard\n`
                        +`\nNext update in: `;

                    if(fields.length > 0)
                        printLeaderboard(client, discord, msg, fields, footer);
                });
            }
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }
}

