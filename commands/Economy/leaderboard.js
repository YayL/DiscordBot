async function printLeaderboard(msg, client, disc){
	const embed = new disc.MessageEmbed() // Create embeded message
		.setTitle("***__LEADERBOARD:__***") // Set the title
		.setColor('#9aedea') // Give it a color in hexidecimal format
    let name;
    let index = 1;
	for(val of client.cachedLB){
        name = await client.m.utils.getMember(val.id, msg).then(plr => {return plr.displayName})
        embed.addFields({
            name: "**" + index + ". " + name + " - " + Math.floor((val.bal/client.totalMoney)*1000000)/10000 +"%**",
            value: `**$${client.m.utils.numberWithCommas(val.bal)}**`
        });
        index += 1;
    }

    let seconds = (client.s.total_BT_Time - (Date.now()-client.timer.leaderboard))/1e3
    let minutes = Math.floor(seconds/60)
    seconds = Math.floor(seconds - minutes*60)

    let footer = `These guys are rich! You require a minimum of $${client.m.utils.numberWithCommas(client.s.lbMinimum)} to be on the leaderboard\n`
    +`Total Server Money: ${client.m.utils.numberWithCommas(client.totalMoney)}\nNext update in: `;
    
    if(minutes > 0){footer += ""+minutes+"min "+seconds+"s"
    }else{footer += ""+seconds+"s"}

    embed.setFooter(footer);
	msg.channel.send(embed);
}

module.exports = {
	name: "Leaderboard",    
	alias: ["lb"],
	use: "-Leaderboard",
	description: "See the server leaderboard",
	options: {ShowInHelp: true, Category: "Economy"},
	run: async function(msg, client, disc){
        try{
            if(client.cachedLB.length == undefined) await client.m.data.bal.updateLB(client);
            if(client.totalMoney == 0) await client.m.data.bal.updateTotalMoney(client);
            printLeaderboard(msg, client, disc)
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
                
	}
}

