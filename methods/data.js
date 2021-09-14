exports.bal = require('./dataMethods/bal.js');
exports.gang = require('./dataMethods/gang.js');
exports.items = require('./dataMethods/items.js');
exports.jobs = require('./dataMethods/jobs.js');
exports.rules = require('./dataMethods/rules.js');
exports.market = require('./dataMethods/market.js');
exports.cooldown = require('./dataMethods/cooldown.js');

exports.cleanDatabase = (client) => {
    client.con.query(`DELETE FROM users WHERE key IN (SELECT key FROM (SELECT key, ROW_NUMBER() OVER (PARTITION BY id ORDER BY key) AS row_num FROM users) t WHERE t.row_num > 1 )`);
}
