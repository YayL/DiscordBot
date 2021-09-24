module.exports = {
    name: "GangCreate",
    alias: ['gcreate'],
    use: "-GangCreate [name(3-30characters)]",
    description: "Create a new gang. Requires the creator to be level 8",
    options: {ShowInHelp: true, Category: "Gang"},
    run: async function(client, msg, args, discord){
        try{

            if(await client._user.get(client, msg.author.id, 'job_xp') < client.data.jobs.totalLvlXp(8, true)) 
                return client.eventEm.emit('TooLowLevel', msg, null, 8);

            if(args.length == 0 || ! ( 3 <= args[0].length && args[0].length <= 30 )) 
                return client.eventEm.emit('InvalidArgs', msg, this.use);

			if(await client.gang.user.inGang(client, msg.author.id)) 
				return client.eventEm.emit('alreadyInGang', msg);

            const name = args[0];

			if(!client.gang.permissions.isGang(client, name.toLowerCase())) 
				return client.eventEm.emit('UnavailableName', msg, name);

			client.gang.management.createNewGang(client, name, msg.author.id)
				.then( async (_) => {

					client.gang.user.joinGang(client, await client.gang.getGang(client, name.toLowerCase()), msg.author.id, true);
					
					client.eventEm.emit('joinedGang', msg, name);
					client.eventEm.emit('achivementEarned', msg.channel, msg.author, client.achivementList.find(element => element.id == 'GC'));
				})
			
		}catch(e){
			client.eventEm.emit('CommandError', msg, this.name, args, e);
		}
		
	}
}