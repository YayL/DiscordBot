module.exports = {
	name: "Gang",
	alias: ['g'],
	use: "-Gang",
	description: "Get some info about your gang",
	options: {ShowInHelp: true, Category: "Gang"},
	run: async function(client, msg, args, discord){
		try{

			if(!(await client.gang.user.inGang(client, msg.author.id))) return client.eventEm.emit('notInAGang', msg);

			const gang = await client.gang.user.getGang(client, msg.author.id),
				info = gang.info,
				embed = new discord.MessageEmbed(),
				level = client.data.jobs.expToLevel(gang.experience);

			embed.addFields({
				name: '👥 Members', 
				value: `${gang.members.length}/${client.gang.info.getGangUpgrade(client, gang, 'Member')}`,
				inline: true
			},
			{
				name: '⚙️ Level',
				value: `**Level:** ${level}`
						+ `\n**Experience:** ${Number(gang.experience) - client.data.jobs.totalLevelExp(level, true)}/${client.data.jobs.nextLevelExp(level)}`,
				inline: true
			},
			{
				name: `💵 Bank Balance`,
				value: `**Bank Balance:** $${client.utils.fixNumber(Number(gang.bank), true)}`,
				inline: true
			});

            embed.setTitle(`Gang Info: *__${info.NAME}__*`);
            embed.setColor(`#4a1818`);

            msg.channel.send(embed);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
        
    }
}
