const ur = require('../../loaders/updateRules.js')

module.exports = {
	name: "UpdateRules",
	alias: ["urules", "ur"],
	use: "-UpdateRules",
	description: "Update rules",
	options: {ShowInHelp: false, Category: 'Rules'},
	run: function(client, msg, args, discord){
		try{
			ur.update(client, discord, msg);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
        
    }
}