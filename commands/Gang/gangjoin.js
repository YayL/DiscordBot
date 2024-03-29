module.exports = {
    name: "GangJoin",
    alias: ['gjoin'],
    use: "-GangJoin [guild]",
    description: "Join an existing open guild or guild you've been invited to",
    options: {ShowInHelp: true, Category: "Gang"},
    run: async function(client, msg, args, discord){
        try{
            if(args.length == 0) 
                return;

			if(await client.gang.user.inGang(client, msg.author.id)) 
				return client.eventEm.emit('alreadyInGang', msg);

			const name = args[0].toLowerCase(),
				gang = await client.gang.getGang(client, name);

            if(gang == null) 
                return client.eventEm.emit('gangNonExistent', msg, name);

            let shouldRemove = false;

            if(! client.gang.invite.isInvited(client, gang.info, msg.author.id)){
                if(client.gang.invite.isInviteOnly(client, gang.info.SETTINGS))
                    return client.eventEm.emit('notInvited', msg);
            }
            else
                client.gang.invite.remFromInviteList(client, gang, msg.author.id)

            if(gang.members.length > client.gang.info.getLimit(client, gang, 'Member'))
                return client.eventEm.emit('tooManyMembers', msg);

			client.gang.user.joinGang(client, gang, msg.author.id);

			client.eventEm.emit('joinedGang', msg, gang.info.NAME);

        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e);
        }
        
    }
}