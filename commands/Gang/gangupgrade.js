module.exports = {
	name: "GangUpgrade",
	alias: ['gupgrade', 'gup'],
	use: "-GangUpgrade",
	description: "Upgrade different parts of the gang",
	options: {ShowInHelp: true, Category: "Gang"},
	run: async function(client, msg, args, discord){
		try{

            const gang = await client.gang.user.getGang(client, msg.author.id);

			if(! await client.gang.user.inGang(client, msg.author.id, gang)) 
				return client.eventEm.emit('notInAGang', msg);

			if(! await client.gang.permissions.isOwner(client, msg.author.id)) 
				return client.eventEm.emit('notGangOwner', msg);

            handleMessage(client, msg, gang, discord)
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e)
		}
		
	}
}

function handleMessage(client, msg, gang, discord){

    const embed = new discord.MessageEmbed()
        .setTitle(`List of Upgrades (${gang.tokens} tokens)`)
        .setColor('#4287f5');

    const upgrade_list_keys = Object.keys(client.s.GANG_UPGRADES);

    let indexList = []

    for(let i = 0; i < upgrade_list_keys.length; i++){
        const index = Object.keys(gang.info.UPGRADES).indexOf(upgrade_list_keys[i]),
            currentLevel = (index == -1 ? 0 : gang.info.UPGRADES[upgrade_list_keys[i]]),
            maxLevel = client.s.GANG_UPGRADES[upgrade_list_keys[i]][0],
            tokenCost = client.gang.tokens.calculateTokenCost(currentLevel);

        if(currentLevel != maxLevel && client.gang.tokens.hasEnoughTokens(gang.tokens, tokenCost))
            indexList.push(i);
    
        
        embed.addFields({
            name: `${client.s.EMOJIS[i]} ${upgrade_list_keys[i]}`,
            value: '**' + (currentLevel != maxLevel 
                ? `Level ${currentLevel}: ${client.utils.fixNumber(Number(client.gang.info.getGangUpgrade(client, gang, upgrade_list_keys[i])), true)}\n${currentLevel + 1  != maxLevel 
                    ? `Level ${(currentLevel + 1)}: `
                    : 'Max: '} ${client.utils.fixNumber(Number(client.gang.info.getGangUpgrade(client, gang, upgrade_list_keys[i], 1)), true)}` 
                : `Max Level`) + `\nTokens: ${tokenCost}` +'** \t\u200b',
            inline: true
        })
    }

    msg.channel.send(embed)
        .then(newMessage => {

            const filter = (reaction, user) => {
                const index = Object.values(client.s.EMOJIS).indexOf(reaction.emoji.name);

                if(user.id != msg.author.id ||  index == -1)
                    return;
                
                if(!newMessage.deleted)
                    newMessage.delete();
                
                client.gang.info.upgrade(client, gang, Object.keys(client.s.GANG_UPGRADES)[index]);
                client.eventEm.emit('GangUpgrade', msg, gang, Object.keys(client.s.GANG_UPGRADES)[index], Object.values(client.s.GANG_UPGRADES)[index][2])
            }

            newMessage.awaitReactions(filter, {time:30000})
                .then(_ => {
                    if(!newMessage.deleted)
                        newMessage.delete();
                })

            for(let i = 0; i < indexList.length; i++){
                newMessage.react(client.s.EMOJIS[indexList[i]]);
            }
            
        })

}