module.exports = {
    async isGang(client, name, override=false){
        if(override != false) 
            return override != null;

		return await client.gang.getGang(client, name) != null;
	},

    async isOwner(client, user_id, gang=false){
        if(!gang)
            return (await client.gang.user.getGang(client, user_id)).owner == user_id;
        return gang.owner == user_id;
    },
}