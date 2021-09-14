exports.common = require('./Items/1.common.js')
exports.uncommon = require('./Items/2.uncommon.js')
exports.rare = require('./Items/3.rare.js')
exports.epic = require('./Items/4.epic.js')
exports.exotic = require('./Items/5.exotic.js')
exports.legendary = require('./Items/6.legendary.js')
exports.special = require('./Items/7.special.js')
exports.god = require('./Items/8.god.js')
exports.limited = require('./Items/9.limited.js')

exports.color_table = ['#6e6968', '#38a32c', '#275eb8', '#823ab5', '#ff8903', '#d4af37', '#d44242', '#ffffff', '#d8a9eb']
exports.lookup_table = ['common', 'uncommon', 'rare', 'epic', 'exotic', 'legendary', 'special', 'god', 'limited']
exports.lootbox_rates = {
	common: [
		0.4, //Common
		0.2, //Uncommon
		0.001, //Rare
	],
	uncommon: [
		0.2, //Common
		0.3, //Uncommon
		0.1, //Rare
		0.001, //Epic
		0.00001, //Exotic
	],
	rare: [
		0.1, //Common
		0.25, //Uncommon
		0.45, //Rare
		0.01, //Epic
		0.0001, //Exotic
		0.0000001, //Legendary
	],
	epic: [
		0.05, //Common
		0.1, //Uncommon
		0.3, //Rare
		0.4, //Epic
		0.003, //Exotic
		0.00001 //Legendary
	],
	exotic: [
		0, //Common
		0.05, //Uncommon
		0.2, //Rare
		0.4, //Epic
		0.3, //Exotic
		0.001, //Legendary
		0.00001, //Special
		0.0000001 //God
	],
	legendary: [
		0, //Common
		0, //Uncommon
		0, //Rare
		0.1, //Epic
		0.35, //Exotic
		0.25, //Legendary
		0.001, //Special
		0.00001, //God
		0.0000001 //Limited
	]

}
