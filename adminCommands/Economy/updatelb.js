module.exports = {
	name: "UpdateLB",
	alias: ["ulb"],
	use: "-UpdateLB",
	description: "Update Money Leaderboard",
	options: {ShowInHelp: false},
	run: function(msg, client){
		try{
			client.eventEm.emit('updateLB')
			client.eventEm.emit('updateLB', 'lvl')
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
		
	}
}