module.exports = {
    name: "Age",
	alias: [],
	use: "-Age",
	description: "Set your characters age",
	options: {ShowInHelp: true, Category: "Cosmetics"},
	run: function(msg, client, disc, args){
        try{

        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
    }
}