 module.exports = {
	name: "GangSettings",
	alias: ['gsettings'],
	use: "-GangSettings [setting]\n"+
		'-GangSettings',
	description: "Change or show the gang settings",	
	options: {ShowInHelp: true, Category: "Gang	"},
	run: async function(client, msg, args, discord){
		try{	

			if(! await client.gang.user.inGang(client, msg.author.id)) 
				return client.eventEm.emit('notInAGang', msg);

			if(! await client.gang.permissions.isOwner(client, msg.author.id)) 
				return client.eventEm.emit('notGangOwner', msg);
			
			var gang = await client.gang.user.getGang(client, msg.author.id),
				info = gang.info,
				value = false;

			if(args.length == 0) 
				return sendSettings(msg, discord, gang, info.SETTINGS);
			
			if(Object.keys(info.SETTINGS).includes(args[0].toUpperCase())){
				value = (info.SETTINGS[args[0].toUpperCase()] ? false : true);

				info.SETTINGS[args[0].toUpperCase()] = value;

				client.gang.info.saveInfo(client, gang.name, info);
				client.eventEm.emit('GangSettingChanged', msg, args[0], value)
			}
			else{
				client.eventEm.emit('GangSettingNotExist', msg, args[0]);
			}
			
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}

function sendSettings(msg, discord, gang, settings){
	const embed = new discord.MessageEmbed(),
		settingKeys = Object.keys(settings), 
		settingValues = Object.values(settings);

	for(var i = 0; i<settingKeys.length; i++){
		embed.addField(settingKeys[i], `**${settingValues[i]}**`, true);
	}
	
	embed.setTitle(`${gang.info.NAME}'s Settings:`);
	embed.setColor('#4a1818');
	embed.setFooter('You can toggle them using -gsettings [setting]');

	msg.channel.send(embed);
}
