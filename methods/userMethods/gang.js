module.exports = {
	joinGang: async(client, gang, user_id, is_created=false) => {
        client.con.query(`UPDATE users SET gang = '${gang.toLowerCase()}' WHERE id = '${user_id}'`);

        if(!is_created){
            const members = gang.members;
            members.push(user_id);

            client.con.query(`UPDATE gangs SET members = '${JSON.stringify(members)}' WHERE name = '${gang}'`);
        }
        
    },

    leaveGang: async (client, user_id, delete_cmd=false) => {
        if(!delete_cmd){
            const gang = await client._user.gang.getGang(client, user_id),
                members = JSON.parse(gang.members).filter(id => id != user_id);

            client.con.query(`UPDATE gangs SET members = '${JSON.stringify(members)}' WHERE name = '${gang.name}'`);
        }
        client.con.query(`UPDATE users SET gang = null WHERE id = '${user_id}'`);
    },
 
    getGang: async (client, user_id) => {
        const gang = await client._user.get(client, user_id, 'gang');

        return (gang == null || gang.toString().length == 0  ? null : await client.data.gang.getGang(client, gang));
    },

    inGang: async(client, user_id) => {
        return (await client._user.gang.getGang(client, user_id)) != null;
    },
}