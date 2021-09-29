module.exports = {
	async joinGang(client, gang, user_id, is_created=false){
        client._user.set(client, user_id, 'gang', gang.name);
        
        if(!is_created){
            const members = gang.members;
            members.push(user_id);
            client.con.query(`UPDATE gangs SET members = '${JSON.stringify(members)}' WHERE name = '${gang.name}'`);
        }
        
    },

    async leaveGang(client, user_id, delete_cmd=false){
        if(!delete_cmd){
            const gang = await client.gang.user.getGang(client, user_id),
                members = gang.members.filter(id => id != user_id);

            client.con.query(`UPDATE gangs SET members = '${JSON.stringify(members)}' WHERE name = '${gang.name}'`);
        }
        client._user.set(client, user_id, 'gang', null);
    },
 
    async getGang(client, user_id){
        const gang = (await client._user.get(client, user_id)).gang;

        return (gang == null || gang.toString().length == 0  ? null : await client.gang.getGang(client, gang));
    },

    async inGang(client, user_id, gang=false){
        return (!gang ? await client.gang.user.getGang(client, user_id) : gang) != null;
    },

}
