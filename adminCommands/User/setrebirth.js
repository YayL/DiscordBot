module.exports = {
	name: "SetRebirth",
	alias: ["setreb", "sreb"],
	use: "-SetRebirth @[user] [level]",
	description: "Set a user's level",
	options: {ShowInHelp: false, Category: 'User'},
	run: function(client, msg, args, discord){
		try{
			let rebirth = client.utils.suffixCheck(args[1], true);
			if(!rebirth || 0 > rebirth) return;

			if(args[0] == "me"){
				client.con.query(`UPDATE users SET rebirths = ${rebirth} WHERE id = '${msg.member.id}'`);
				return client.eventEm.emit('rebirth', msg.member, msg.channel, rebirth);
			}

			client.utils.getMember(args[0], msg)
				.then(member => {
					if(member == null) return;
					client.con.query(`UPDATE users SET rebirths = ${rebirth} WHERE id = '${member.id}'`);
					client.eventEm.emit('rebirth', member, msg.channel, rebirth);
				});
			
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}