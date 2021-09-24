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
        0.9, //Common
        0.005, //Uncommon
    ],
    uncommon: [
        0.25, //Common
        0.9, //Uncommon
        0.0005, //Rare
    ],
    rare: [
        0, //Common
        0.1, //Uncommon
        0.9, //Rare
        0.0015, //Epic
    ],
    epic: [
        0, //Common
        0.001, //Uncommon
        0.2, //Rare
        0.9, //Epic
        0.0005, //Exotic
    ],
    exotic: [
        0, //Common
        0, //Uncommon
        0.01, //Rare
        0.125, //Epic
        0.9, //Exotic
        0.0005, //Legendary
    ],
    legendary: [
        0, //Common
        0, //Uncommon
        0, //Rare
        0.1, //Epic
        0.35, //Exotic
        0.25, //Legendary
        0.0005, //Special
        0.00001, //God
        0.0000001 //Limited
    ]

}