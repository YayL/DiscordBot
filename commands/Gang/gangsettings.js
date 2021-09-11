 module.exports = {
	name: "GangSettings",
	alias: ['gsettings'],
	use: "-GangSettings [setting] [on/off]",
	description: "Change or show the gang settings",	
	options: {ShowInHelp: true, Category: "Gang	"},
	run: async function(msg, client, disc, args){
		try{	

			if(! await client._user.gang.inGang(client, msg.author.id)) 
				return client.eventEm.emit('notInAGang', msg);

			if(! await client.data.gang.isOwner(client, msg.author.id)) 
				return client.eventEm.emit('notGangOwner', msg);
			
			var gang = await client._user.gang.getGang(client, msg.author.id),
				info = gang.info,
				value = false;

			if(args.length == 0) 
				return sendSettings(client, msg, disc, gang, info.SETTINGS);
			
			if(Object.keys(info.SETTINGS).includes(args[0].toUpperCase())){
				if(args.length == 1) 
					value = (info.SETTINGS[args[0].toUpperCase()] ? false : true);
				else 
					value = (args[1] === 'on' ? true : false);

				info.SETTINGS[args[0].toUpperCase()] = value;

				client.data.gang.saveInfo(client, gang.name, info);
			}
			
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}

function sendSettings(client, msg, disc, gang, settings){
	const embed = new disc.MessageEmbed(),
		settingKeys = Object.keys(settings), 
		settingValues = Object.values(settings);

	for(var i = 0; i<settingKeys.length; i++){
		embed.addField(settingKeys[i], `**${settingValues[i]}**`, true);
	}
	
	embed.setTitle(`${gang.info.NAME}'s Settings:`);
	embed.setColor('#4a1818');
	embed.setFooter('You can change them using -gsettings [setting] [on/off]');

	msg.channel.send(embed);
}