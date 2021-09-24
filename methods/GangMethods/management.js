module.exports = {

    createNewGang(client, NAME, CREATOR_ID){
        let GANG_INFO_TEMPLATE = client.s.GANG_INFO_TEMPLATE;
        GANG_INFO_TEMPLATE.NAME = NAME; 
        
        return new Promise(resolve => {
		    client.con.query(`INSERT INTO gangs (name, owner, members, info) VALUES ('${NAME.toLowerCase()}', '${CREATOR_ID}', '${JSON.stringify([CREATOR_ID])}', '${JSON.stringify(GANG_INFO_TEMPLATE)}')`, (e, val) => {
                resolve();
            });
        })
	},

    async disbandGang(client, NAME) {
        const gang = await client.gang.getGang(client, NAME);
        const members = gang.members;

        for(member_id of members){
            client.gang.user.leaveGang(client, member_id, true);
        }

        client.con.query(`DELETE FROM gangs WHERE name = '${gang.name}'`);
    },
}