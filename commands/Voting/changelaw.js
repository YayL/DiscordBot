module.exports = {
	name : "ChangeLaw",
	alias : ["claw"],
	use: "-ChangeLaw [Number] [New Description]",
	description : "A command only spoken of in Myths!",
	options: {ShowInHelp: false, Category: "Voting"}, // Change ShowInHelp when finished
	run : function(client, msg, args, discord){
		try{

        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
	}
}

