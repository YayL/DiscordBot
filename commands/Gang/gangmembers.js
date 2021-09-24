module.exports = {
	name: "GangMembers",
	alias: ['gm', 'gmembers'],
	use: "-GangMembers",
	description: "Get a list of members of a gang",
	options: {ShowInHelp: true, Category: "Gang"},
	run: async function(client, msg, args, discord){
		try{

			if(!(await client.gang.user.inGang(client, msg.author.id))) return client.eventEm.emit('notInAGang', msg);

			const gang = await client.gang.user.getGang(client, msg.author.id),
				info = gang.info,
				embed = new discord.MessageEmbed();

            let text = '';

            for(let i = 0; i < gang.members.length; i++){
                embed.addFields({
                    name: `\u200b`,
                    value: `${await client.utils.getMember(gang.members[i], msg)}`,
                    inline: true
                })
            }

			embed.setTitle(`Gang Members: *__${info.NAME}__*`);
			embed.setColor(`#4a1818`);
            embed.setFooter(`${gang.members.length}/${client.gang.info.getGangUpgrade(client, gang, 'Member')}`);

			msg.channel.send(embed);
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e)
		}
		
	}
}
