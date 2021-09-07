const { PerformanceObserver, performance } = require('perf_hooks');

module.exports = {
	name: "TestEvent",
	alias: ["te", "tevent"],
	use: "-TestEvent",
	description: "Test event",
	options: {ShowInHelp: false, Category: 'Utils'},
	run: function(msg, client, disc, args){
		try{

        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
		
	}
}