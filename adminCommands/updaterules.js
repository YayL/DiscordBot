const m = require('./../methodsLoader.js');

const ur = require('./../loaders/updateRules.js')

module.exports = {
	name: "UpdateRules",
	alias: ["urules", "ur"],
	use: "-UpdateRules",
	description: "Update rules",
	options: {ShowInHelp: false},
	run: function(msg, client, disc, args){
		ur.update(client, disc, msg);
	}
}