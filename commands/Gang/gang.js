const ON_OR_OFF = (bool) => (bool ? 'on' : 'off')
const notNull = (val, def) => (val != null ? val : def)

module.exports = {
	name: "gang",
	alias: ['g'],
	use: "-gang",
	description: "Get some info about your gang",
	options: {ShowInHelp: true, Category: "Gang"},
	run: async function(msg, client, disc, args){
		try{

			if(!(await client._user.gang.inGang(client, msg.author.id))) return client.eventEm.emit('notInAGang', msg)

			const gang = await client._user.gang.getGang(client, msg.author.id)
			const info = JSON.parse(gang.info)

			var embed = new disc.MessageEmbed();

			embed.addFields({
				name: '👥 Members', 
				value: `${JSON.parse(gang.members).length}/10\nInvite people using -ginvite`,
				inline: true
			},
			{
				name: '-',
				value: '-',
				inline: true
			}
			)

			embed.setTitle(`Gang Info: *__${info.NAME}__*`)
			embed.setColor(`#4a1818`)
			embed.setFooter(``)

			msg.channel.send(embed);
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e)
		}
		
	}
}