module.exports = {
	name: "UpdateGangInfo",
	alias: ["ugi"],
	use: "-UpdateGangInfo",
	description: "Update all gangs info to match the current info template",
	options: {ShowInHelp: false, Category: 'Gang'},
	run: async function(client, msg, args, discord){
		try{
			var gangs = await client.data.gang.getAllGangs(client), gang_template = client.s.GANG_INFO_TEMPLATE;

			if(gangs == null) return client.eventEm.emit('NoExistingGangs', msg);

			const gang_template_keys = Object.keys(client.s.GANG_INFO_TEMPLATE), 
				gang_template_values = Object.values(client.s.GANG_INFO_TEMPLATE),
				gang_template_settings_keys = Object.keys(client.s.GANG_INFO_TEMPLATE.SETTINGS),
				gang_template_settings_values = Object.values(client.s.GANG_INFO_TEMPLATE.SETTINGS);

			var info, gangKeys, gangValues, settingKeys, settingValues;

			for(var guild_index = 0; guild_index<gangs.length; guild_index++){
				info = JSON.parse(gangs[guild_index].info), gangKeys = Object.keys(info);
				settingKeys = Object.keys(info.SETTINGS);

				// ------------- Add to info -------------
				for(var i = 0; i < gang_template_keys.length; i++){
					if(!gangKeys.includes(gang_template_keys[i])){
						info[gang_template_keys[i]] = gang_template_values[i];
					}
				}
				// -------------------------------------------
				// ------------- Add to settings -------------
				for(var i = 0; i < gang_template_settings_keys.length; i++){
					if(!settingKeys.includes(gang_template_settings_keys[i])){
						info.SETTINGS[gang_template_settings_keys[i]] = gang_template_settings_values[i];
					}
				}
				// --------------------------------------------
				// ------------- Remove from info -------------
				for(var i = 0; i < gangKeys.length; i++){
					if(!gang_template_keys.includes(gangKeys[i])){
						delete info[gangKeys[i]];
					}
				}
				// ------------------------------------------------
				// ------------- Remove from settings -------------
				for(var i = 0; i < settingKeys.length; i++){
					if(!gang_template_settings_keys.includes(settingKeys[i])){
						delete info.SETTINGS[settingKeys[i]];
					}
				}
				// ------------------------------------------------
				client.con.query(`UPDATE gangs SET info = '${JSON.stringify(info)}'`);
			}


		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}