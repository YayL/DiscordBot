module.exports = {
	name: "GangJoin",
	alias: ['gjoin'],
	use: "-GangJoin [guild]",
	description: "Join an existing open guild or guild you've been invited to",
	options: {ShowInHelp: true, Category: "Gang"},
	run: async function(msg, client, disc, args){
		try{
			if(args.length == 0) return

			if(await client._user.gang.inGang(client, msg.author.id)) return client.eventEm.emit('alreadyInGang', msg);

			const name = args[0]

			const gang = await client._user.gang.getGang(client, name)

			if(!client.data.gang.isGang(client, name, gang)) return client.eventEm.emit('gangNonExistent', msg, name)

			const info = JSON.parse(gang.info)

			if(client.data.gang.isInviteOnly(client, info.SETTINGS)){
				if(!client.data.gang.isInvited(client, info, msg.author.id)) return client.eventEm.emit('notInvited', msg)
				client.data.gang.remFromInviteList(client, gang, msg.author.id)
			}

			client._user.gang.joinGang(client, gang.name, msg.author.id)

			client.eventEm.emit('joinedGang', msg, JSON.parse(gang.info).NAME)

		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e)
		}
		
	}
}