module.exports = {
	name: "TestEvent",
	alias: ["te", "tevent"],
	use: "-TestEvent",
	description: "Test event",
	options: {ShowInHelp: false},
	run: function(msg, client, disc, args){
		try{
			client.eventEm.emit("rebirth", msg.member, msg.channel); // Rebirth event
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
		
	}
}