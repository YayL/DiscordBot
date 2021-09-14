const { PerformanceObserver, performance } = require('perf_hooks');

module.exports = {
	name: "TestEvent",
	alias: ["te", "tevent"],
	use: "-TestEvent",
	description: "Test event",
	options: {ShowInHelp: false, Category: 'Utils'},
	run: async function(client, msg, args, discord){
		try{
			client.msg.log("INFO", client.utils.fixNumber(client.totalMoney, true));
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}
