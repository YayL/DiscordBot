module.exports = {
	name: "SetRebirth",
	alias: ["setreb", "sreb"],
	use: "-SetLevel @[user] [level]",
	description: "Set a user's level",
	options: {ShowInHelp: false},
	run: function(msg, client, disc, args){
		try{
			let rebirth = client.m.utils.suffixCheck(args[1], true)
			if(!rebirth || 0 > rebirth) return;

			if(args[0] == "me"){
				client.con.query(`UPDATE user SET rebirths = ${rebirth} WHERE id = ${msg.member.id}`);
				return client.eventEm.emit('rebirth', msg.member, msg.channel, rebirth);
			}

			client.m.utils.getMember(args[0], msg)
			.then(member => {
				client.con.query(`UPDATE user SET rebirths = ${rebirth} WHERE id = ${member.id}`);
				client.eventEm.emit('rebirth', member, msg.channel, rebirth);
			}).catch(e => {
				client.eventEm.emit('CommandError', msg, this.name, args, e)
			});
			
			
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }
		
	}
}