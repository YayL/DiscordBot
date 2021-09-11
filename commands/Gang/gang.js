module.exports = {
	name: "gang",
	alias: ['g'],
	use: "-gang",
	description: "Get some info about your gang",
	options: {ShowInHelp: true, Category: "Gang"},
	run: async function(msg, client, disc, args){
		try{

			if(!(await client._user.gang.inGang(client, msg.author.id))) return client.eventEm.emit('notInAGang', msg);

			const gang = await client._user.gang.getGang(client, msg.author.id),
				info = gang.info,
				embed = new disc.MessageEmbed();

			embed.addFields({
				name: '👥 Members', 
				value: `${gang.members.length}/10\nInvite people using -ginvite`,
				inline: true
			},
			{
				name: '-',
				value: '-',
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