const { PerformanceObserver, performance } = require('perf_hooks');

module.exports = {
	name: "TestEvent",
	alias: ["te", "tevent"],
	use: "-TestEvent",
	description: "Test event",
	options: {ShowInHelp: false, Category: 'Utils'},
	run: async function(msg, client, disc, args){
		try{
			console.log(client.utils.fixNumber(client.totalMoney, true));
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
		
	}
}