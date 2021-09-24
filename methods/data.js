exports.bal = require('./DataMethods/bal.js');
exports.items = require('./DataMethods/items.js');
exports.jobs = require('./DataMethods/jobs.js');
exports.rules = require('./DataMethods/rules.js');
exports.market = require('./DataMethods/market.js');
exports.cooldown = require('./DataMethods/cooldown.js');

exports.cleanDatabase = (client) => {
    client.con.query(`DELETE FROM users WHERE key IN (SELECT key FROM (SELECT key, ROW_NUMBER() OVER (PARTITION BY id ORDER BY key) AS row_num FROM users) t WHERE t.row_num > 1 )`);
}