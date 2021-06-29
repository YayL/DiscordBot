module.exports = (client) => {
	client.msg = require('./methods/messaging'),
	client.data = require('./methods/data'),
	client.utils = require('./methods/utils')
}
