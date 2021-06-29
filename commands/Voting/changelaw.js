module.exports = {
	name : "ChangeLaw",
	alias : ["claw"],
	use: "-ChangeLaw (Number) (New Description)",
	description : "Create a vote to change a law/rule on the server",
	options: {ShowInHelp: false, Category: "Voting"}, // Change ShowInHelp when finished
	run : function(msg, client, disc){
		try{

        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
	}
}

