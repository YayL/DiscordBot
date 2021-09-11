module.exports = {
	name: "GangJoin",
	alias: ['gjoin'],
	use: "-GangJoin [guild]",
	description: "Join an existing open guild or guild you've been invited to",
	options: {ShowInHelp: true, Category: "Gang"},
	run: async function(msg, client, disc, args){
		try{
			if(args.length == 0) 
				return;

			if(await client._user.gang.inGang(client, msg.author.id)) 
				return client.eventEm.emit('alreadyInGang', msg);

			const name = args[0],
				gang = await client.data.gang.getGang(client, name),
				info = gang.info;

			if(gang == null) 
				return client.eventEm.emit('gangNonExistent', msg, name);

			if(client.data.gang.isInviteOnly(client, info.SETTINGS)){
				if(! client.data.gang.isInvited(client, info, msg.author.id)) 
					return client.eventEm.emit('notInvited', msg);
				client.data.gang.remFromInviteList(client, gang, msg.author.id);
			}

			client._user.gang.joinGang(client, gang, msg.author.id);

			client.eventEm.emit('joinedGang', msg, info.NAME);

		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}