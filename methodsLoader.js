module.exports = (client) => {
    client.msg = require('./methods/messaging.js'),
    client.data = require('./methods/data.js'),
    client._user = require('./methods/user.js'),
    client.utils = require('./methods/utils.js')
}
