module.exports = {
	name : "ChangeLaw",
	alias : ["claw"],
	use: "-ChangeLaw [Number] [New Description]",
	description : "A command only spoken of in Myths!",
	options: {ShowInHelp: false, Category: "Voting"}, // Change ShowInHelp when finished
	run : function(msg, client, disc){
		try{

        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
	}
}

