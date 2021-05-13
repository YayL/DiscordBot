module.exports = {
	name: "UpdateLB",
	alias: ["ulb"],
	use: "-UpdateLB",
	description: "Update Money Leaderboard",
	options: {ShowInHelp: false},
	run: function(msg, client){
		try{
			client.m.data.bal.updateLB(client);
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
		
	}
}